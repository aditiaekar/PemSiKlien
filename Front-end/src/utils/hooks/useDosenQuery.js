// src/utils/hooks/useDosenQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as dosenApi from "../../services/dosenService";

export function useDosenQuery(page = 1, perPage = 5) {
  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: ["dosen"],
    queryFn: dosenApi.list,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const all = listQuery.data ?? [];      // semua mahasiswa
  const total = all.length;              // total data

  // Hitung slice untuk halaman ini
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pageItems = all.slice(start, end); // hanya data halaman aktif


  const createMutation = useMutation({
    mutationFn: dosenApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => dosenApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => dosenApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
    },
  });

  return {
    ...listQuery,
    dosen: pageItems,
    total,
    page,
    perPage,
    createDosen: createMutation.mutateAsync,
    updateDosen: updateMutation.mutateAsync,
    deleteDosen: deleteMutation.mutateAsync,
  };
}
