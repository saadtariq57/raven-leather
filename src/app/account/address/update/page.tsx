"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ButtonLoadingSpinner from "@/components/ButtonLoadingSpinner";
import { Address } from "@prisma/client";
import LoadingSpinner from "@/components/LoadingSpinner";
import UpdateAddressPageSkeleton from "./loading";

const addressSchema = z.object({
  fullName: z.string().nonempty("Full Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNo: z.string().min(10, "Phone must be at least 10 characters"),
  address: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
  countryRegion: z.string().nonempty("Country/Region is required"),
});

export default function UpdateAddressPage() {
  const { data } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    async function fetchAddress() {
      try {
        const user_id = Number(data?.user?.id);
        const response = await axios.get(`/api/user/address/get?userId=${user_id}`);
        const address: Address = response.data.address;

        if (address) {
          form.reset({
            fullName: address.fullName,
            email: address.email,
            phoneNo: address.phoneNo,
            address: address.address,
            city: address.city,
            countryRegion: address.countryRegion,
          })
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error while fetchAddress: ", error);
      }
    }

    fetchAddress();

  }, [])


  const onSubmit = async (values: z.infer<typeof addressSchema>) => {
    setIsSubmitting(true);
    console.log("Form Submitted: ", values);
    const user_id = Number(data?.user?.id);
    const addressData = { ...values, user_id }

    try {
      const response = await axios.post(`/api/user/address/update?userId=${user_id}`, addressData);
      console.log("response: ", response.data);

      if (response.data.success) {
        const searchParams = new URLSearchParams(window.location.search);
        const redirectPath = searchParams.get("redirect");
        console.log("redirectPath: ", redirectPath);
        
        if (redirectPath) {
          router.push(redirectPath);
        } else if (pathName.startsWith('/account')) {
          router.push('/account');
        }
      }
    } catch (error) {
      setIsSubmitting(false)
      console.log("Error while submitting. ", error);
    }

  };

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Address</h1>
      {
        isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <UpdateAddressPageSkeleton />
          </div>
        ) : (
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
                  {isSubmitting ? <ButtonLoadingSpinner /> : "Update Address"}
                </Button>
                <Button type="button" variant="outline" disabled={isSubmitting} onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        )
      }

    </div>
  );
};

