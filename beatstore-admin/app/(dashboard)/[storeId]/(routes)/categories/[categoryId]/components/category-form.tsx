"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { Billboard, Category } from "@prisma/client";

import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[]
}

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
})

type CategoryFormValues = z.infer<typeof formSchema>;

export default function CategoryForm({ initialData, billboards }: CategoryFormProps) {

  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar categoria" : "Criar categoria"
  const description = initialData ? "Editar uma categoria existente" : "Criar uma nova categoria"
  const toastMessage = initialData ? "Categoria atualizada." : "Categoria criada."
  const action = initialData ? "Salvar mudanças" : "Criar"

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      billboardId: ''
    }
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Algo deu errado.")
    } finally {
      setLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Categoria apagada com sucesso!");
    } catch (error) {
      toast.error("Lembre de apagar todos os produtos desta categoria.")
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />
        {
          initialData && (
            <Button
              disabled={loading}
              variant={"destructive"}
              size={"icon"}
              onClick={() => { setOpen(true) }}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )
        }
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nome da categoria" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"billboardId"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quadro de aviso</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecione um quadro de avisos"
                        >
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        billboards.map((billboard) => (
                          <SelectItem
                            key={billboard.id}
                            value={billboard.id}
                          >
                            {billboard.label}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
