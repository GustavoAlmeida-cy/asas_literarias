"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "@/lib/validations";
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
import { IMaskInput } from "react-imask";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type SignUpFormData = z.infer<typeof signUpSchema>;

// Componente reutilizável de senha com toggle de visibilidade
function PasswordField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [show, setShow] = useState(false);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            type={show ? "text" : "password"}
            placeholder="********"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export default function SignUpForm() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: {
        ddi: "",
        ddd: "",
        number: "",
      },
      state: "SP",
    },
  });

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    console.log("Dados do formulário:", data);
    toast.success("Cadastro realizado com sucesso!");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-lg mx-auto"
      >
        {/* Nome completo */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Senha */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <PasswordField
              label="Senha"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {/* Confirmar senha */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <PasswordField
              label="Confirmar senha"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {/* Telefone com máscara */}
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="phone.ddi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DDI</FormLabel>
                <FormControl>
                  <IMaskInput
                    mask={"+00"}
                    {...field}
                    onAccept={(value: string) => field.onChange(value)}
                    className="w-full border rounded px-2 py-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone.ddd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DDD</FormLabel>
                <FormControl>
                  <IMaskInput
                    mask={"00"}
                    {...field}
                    onAccept={(value: string) => field.onChange(value)}
                    className="w-full border rounded px-2 py-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone.number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <IMaskInput
                    mask={"00000-0000"}
                    {...field}
                    onAccept={(value: string) =>
                      field.onChange(value.replace(/\D/g, ""))
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Estado */}
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {signUpSchema.shape.state.options.map((uf) => (
                      <SelectItem key={uf} value={uf}>
                        {uf}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
