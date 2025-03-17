"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ButtonLoadingSpinner from "@/components/ButtonLoadingSpinner";

const addressSchema = z.object({
  fullName: z.string().nonempty("Full Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNo: z.string().min(10, "Phone must be at least 10 characters"),
  address: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
  countryRegion: z.string().nonempty("Country/Region is required"),
});

export default function AddAdressPage() {
  const { data } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathName = usePathname();

  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNo: "",
      address: "",
      city: "",
      countryRegion: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof addressSchema>) => {
    setIsSubmitting(true);
    const user_id = Number(data?.user?.id);
    const addressData = {...values, user_id}    

    try {
      const response = await axios.post("/api/user/address/create", addressData);
      
      if(response.data.success){
        const searchParams = new URLSearchParams(window.location.search);
        const redirectPath = searchParams.get("redirect");
        if (redirectPath) {
          router.push(redirectPath);
        } else if (pathName.startsWith('/account')) {
          router.push('/account');
        }
      }
      
    } catch (error) {
      setIsSubmitting(false)
    }

  };

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Address</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone #</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="countryRegion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country/Region</FormLabel>
                <FormControl>
                  <Input placeholder="Country/Region" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting} className="bg-black text-white">
              {isSubmitting ? <ButtonLoadingSpinner /> : "Add Address"}
            </Button>
            <Button type="button" variant="outline" disabled={isSubmitting} onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

