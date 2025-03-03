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
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import axios from "axios";
import ButtonLoadingSpinner from "@/components/ButtonLoadingSpinner";

// Zod Schema for Form Validation
const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  color: z.string().min(1, "Product color is required"),
  category: z.string().min(1, "Category is required"),
  price: z
    .number()
    .min(0, "Price cannot be less than 0")
    .refine((value) => value !== undefined, { message: "Price is required" }),
  quantity: z
    .number()
    .min(0, "Quantity cannot be less than 0")
    .refine((value) => value !== undefined, { message: "Quantity is required" }),
  description: z.string().min(1, "Description is required"),
  status: z.boolean(),
  images: z
    .array(
      z.object({
        uid: z.string(),
        name: z.string(),
        originFileObj: z.any(), // Allow file objects
      })
    ).min(1, "At least one image is required")
});

export default function AddBeltDialog() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [open, setOpen] = useState(false);


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "",
      category: "belt",
      price: 0,
      quantity: 0,
      description: "",
      images: [] as { uid: string; name: string; originFileObj?: File }[],
      status: false,
    },
  });

  const onSubmit = async (data: any) => {
    setIsAdding(true);
    console.log("Raw Form Data:", data); // Debugging step

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "images" && Array.isArray(value)) {
        value.forEach((file: any) => {
          if (file.originFileObj instanceof File) {
            formData.append("images", file.originFileObj); // ✅ Only append valid File objects
          } else {
            console.warn("Invalid file type:", file);
          }
        });
      } else if (typeof value === "boolean" || typeof value === "number") {
        formData.append(key, value.toString()); // ✅ Convert booleans/numbers to strings
      } else if (typeof value === "string") {
        formData.append(key, value);
      } else {
        console.warn(`Skipping key "${key}" with unsupported type:`, value);
      }
    });

    try {
      const response = await axios.post("/api/admin/product/add-product", formData)
      console.log("Response:", response.data);
      if (response.data.success) {
        setIsAdding(false);
        setOpen(false);
        window.location.reload();
      }

    } catch (error) {
      setIsAdding(false);
      console.error("Error adding product:", error);
    }

  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Belt</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add Belt</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 mt-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Product Name */}
              <FormField
                control={form.control}
                name="name"
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
                name="color"
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
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Images</FormLabel>
                      <FormControl>
                        <ImageUploader
                          value={fileList}
                          onChange={(files) => {
                            setFileList(files);
                            form.setValue(
                              "images",
                              files.map((file) => ({
                                uid: file.uid,
                                name: file.name,
                                originFileObj: file.originFileObj as File, // ✅ Explicitly cast to File
                              }))
                            );
                            form.trigger("images"); // Ensure validation updates
                          }}
                        />


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

              {/* Product Status */}
              <FormField
                control={form.control}
                name="status"
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
              <Button type="submit" className="px-6 py-2" disabled={isAdding} >
                {isAdding ? <ButtonLoadingSpinner/> : "Add Product"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
