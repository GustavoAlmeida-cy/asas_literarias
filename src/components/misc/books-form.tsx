"use client";

import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { bookSchema } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FileUploader from "@/components/misc/file-upload";

type BooksFormData = z.infer<typeof bookSchema>;

export default function BooksForm() {
  const form = useForm<BooksFormData>({
    resolver: zodResolver(bookSchema) as Resolver<BooksFormData>,
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      condition: "Novo",
      summary: "",
      donorComment: "",
      totalCopies: 1,
      coverUrls: [""],
    },
  });

  const onSubmit: SubmitHandler<BooksFormData> = (data) => {
    console.log("Dados do livro:", data);
    alert("Livro cadastrado com sucesso!");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-lg mx-auto"
      >
        {/* Título */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título do livro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Autor */}
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Autor</FormLabel>
              <FormControl>
                <Input placeholder="Nome do autor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gênero */}
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gênero</FormLabel>
              <FormControl>
                <Input placeholder="Gênero do livro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Condição */}
        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condição</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a condição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Novo">Novo</SelectItem>
                    <SelectItem value="Usado">Usado</SelectItem>
                    <SelectItem value="Danificado">Danificado</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Resumo */}
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resumo</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  placeholder="Resumo do livro"
                  className="w-full border rounded px-2 py-1"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Comentário do doador */}
        <FormField
          control={form.control}
          name="donorComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comentário do doador (opcional)</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  placeholder="Comentário do doador"
                  className="w-full border rounded px-2 py-1"
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Total de cópias */}
        <FormField
          control={form.control}
          name="totalCopies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total de cópias</FormLabel>
              <FormControl>
                <Input type="number" min={1} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* FileUploader para capas */}
        <FormField
          control={form.control}
          name="coverUrls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capas do livro</FormLabel>
              <FileUploader
                maxSizeMB={50}
                maxFiles={5} // limite máximo de capas
                onFilesChange={(urls) => field.onChange(urls)} // atualiza coverUrls com o array completo
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Cadastrar Livro
        </Button>
      </form>
    </Form>
  );
}
