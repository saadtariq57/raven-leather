"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ImageUploader } from "@/components/ImageUpload";
import { useState } from "react";
import { UploadFile } from "antd";
import { SelectGroup } from "@radix-ui/react-select";

// Zod Schema for Form Validation
const formSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productColor: z.string().min(1, "Product color is required"),
  price: z
    .number()
    .min(0, "Price cannot be less than 0")
    .refine((value) => value !== undefined, { message: "Price is required" }),
  quantity: z
    .number()
    .min(0, "Quantity cannot be less than 0")
    .refine((value) => value !== undefined, { message: "Quantity is required" }),
  description: z.string().min(1, "Description is required"),
  features: z.string().min(1, "Features are required"),
  productImages: z.array(z.object({ uid: z.string(), name: z.string() })).optional(),
  productStatus: z.boolean(),
});

export default function EditProductDialog() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productColor: "",
      price: 0,
      quantity: 0,
      description: "",
      features: "",
      productImages: [],
      productStatus: false,
    },
  });

  const onSubmit = (data: any) => {
    // const formattedData = {
    //   ...data,
    //   price: Number(data.price),
    //   quantity: Number(data.quantity),
    // };

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "productImages") {
        data.productImages.forEach((file: any) => {
          formData.append("productImages", file.originFileObj);
        });
      } else {
        formData.append(key, data[key]);
      }
      
    });

    // You can now submit formData with files
    alert("Product added successfully!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Product</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 mt-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Product Name */}
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Product Color */}
              <FormField
                control={form.control}
                name="productColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Color</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price and Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Price"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Quantity"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Product Images */}
              <div>
                <FormField
                  control={form.control}
                  name="productImages"
                  render={() => (
                    <FormItem>
                      <FormLabel>Product Images</FormLabel>
                      <FormControl>
                        <ImageUploader value={fileList} onChange={setFileList} />
                      </FormControl>
                      <FormDescription>Click to upload product images</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} className="h-24" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Features */}
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Features" {...field} className="h-24" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Product Status */}
              <FormField
                control={form.control}
                name="productStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Status</FormLabel>
                    <FormControl>
                      <Select
                       value={field.value ? "active" : "inactive"} // Map boolean to string
                       onValueChange={(value) => field.onChange(value === "active")} // Map string back to boolean
                     >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2 flex justify-end mt-6">
              <Button type="submit" className="px-6 py-2">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
