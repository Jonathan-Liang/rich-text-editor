'use client'
import {
  Form, 
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import Tiptap from '@/components/Tiptap'
import * as z from "zod";

export default function Home() {
  const formSchema = z.object({
    title: z
      .string()
      .min(1, { message: "Not long enough"})
      .max(100, { message: "Too long"}),
    description: z
      .string()
      .min(5, { message: "Not long enough"})
      .max(1000, { message: "Too long"})
      .trim(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: 'Title Here',
      description: "Description Here",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {

  }

  
  return (
    <main className="p-24">
      <h1 className="text-4xl font-bold mb-8">Note Editor</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl font-bold">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Main title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl font-bold">Description</FormLabel>
                  <FormControl>
                    <Tiptap description={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button variant="default">Save</Button>
        </form>
      </Form>
    </main>
  );
}


