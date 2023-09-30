"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1),
})

export default function StoreModal() {
  const [loading, setLoading] = useState(false);

  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/stores", values)

      toast.success("Loja criada com sucesso!")
    } catch (error) {
      toast.error("Ops, algo deu errado.");
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Modal title="Criar loja" description="Criar uma nova loja para gerenciar produtos e categorias" isOpen={storeModal.isOpen} onClose={storeModal.onClose} >
        <div>
          <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="E-commerce"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <div className="w-full pt-6 space-x-2 flex items-center justify-end">
                  <Button
                    variant="outline"
                    onClick={storeModal.onClose}
                    disabled={loading}
                  >Cancelar</Button>
                  <Button
                    type="submit"
                    disabled={loading}
                  >
                    Confirmar</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}
