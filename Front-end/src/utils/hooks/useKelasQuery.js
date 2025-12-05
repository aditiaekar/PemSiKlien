import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as kelasApi from "../../services/kelasService";

export function useKelasOptions() {
  return useQuery({
    queryKey: ["kelas-options"],
    queryFn: kelasApi.getFormOptions,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useKelasQuery(page, perPage) {
  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: ["kelas", page, perPage],
    queryFn: () => kelasApi.list(page, perPage),

    keepPreviousData: true,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: kelasApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => kelasApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => kelasApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
    },
  });

  return {
    ...listQuery,
    kelas: listQuery.data?.data || [],
    total: listQuery.data?.total || 0,
    createMutation: createMutation.mutateAsync,
    updateMutation: updateMutation.mutateAsync,
    deleteMutation: deleteMutation.mutateAsync,
  };
}
