// src/utils/hooks/useMataKuliahQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as mkApi from "../../services/mataKuliahService";

export function useMataKuliahQuery(page = 1, perPage = 5) {
  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: ["mahasiswa"],
    queryFn: mkApi.list,
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
    mutationFn: mkApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mata_kuliah"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => mkApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mata_kuliah"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => mkApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mata_kuliah"] });
    },
  });

  return {
    ...listQuery,
    mataKuliah: pageItems,
    total,
    page,
    perPage,
    createMK: createMutation.mutateAsync,
    updateMK: updateMutation.mutateAsync,
    deleteMK: deleteMutation.mutateAsync,
  };
}
