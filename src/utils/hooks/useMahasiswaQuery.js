// src/utils/hooks/useMahasiswaQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as mahasiswaApi from "../../services/mahasiswaService";

export function useMahasiswaQuery(page = 1, perPage = 5) {
  const queryClient = useQueryClient();

  // Ambil semua mahasiswa
  const listQuery = useQuery({
    queryKey: ["mahasiswa"],
    queryFn: () => mahasiswaApi.list(),   // ← tidak pakai page/limit lagi
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const all = listQuery.data ?? [];      // semua mahasiswa
  const total = all.length;              // total data

  // Hitung slice untuk halaman ini
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pageItems = all.slice(start, end); // hanya data halaman aktif

  // Mutasi tetap sama
  const createMutation = useMutation({
    mutationFn: mahasiswaApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => mahasiswaApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => mahasiswaApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
    },
  });

  return {
    ...listQuery,
    mahasiswa: pageItems,                  // ← ini yang dipakai tabel
    total,                                 // ← ini dipakai hitung totalPages
    page,
    perPage,
    createMahasiswa: createMutation.mutateAsync,
    updateMahasiswa: updateMutation.mutateAsync,
    deleteMahasiswa: deleteMutation.mutateAsync,
  };
}
