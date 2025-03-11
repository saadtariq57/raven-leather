"use client";

import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

/* eslint-disable @typescript-eslint/no-unused-vars */
const addressSchema = z.object({
  fullName: z.string().nonempty("Full Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNo: z.string().min(10, "Phone must be at least 10 characters"),
  address: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
  countryRegion: z.string().nonempty("Country/Region is required"),
});
/* eslint-enable @typescript-eslint/no-unused-vars */

interface AddressComponentProps {
  form: UseFormReturn<z.infer<typeof addressSchema>>; // Use addressSchema as form type
}

export default function AddressComponent({ form }: AddressComponentProps ) {
  const { data } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const onSubmit = async (values: z.infer<typeof addressSchema>) => {
    console.log("Form Submitted: ", values);
    const user_id = Number(data?.user?.id);
    const addressData = {...values, user_id}    

    try {
      const response = await axios.post("/api/user/address/create", addressData);
      console.log("response: ", response.data);
      
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
      console.log("Error while submitting. ", error);
    }

  };

  return (
    <div className="max-w-3xl mx-auto mb-8">
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

        </form>
      </Form>
    </div>
  );
};

