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
import { useEffect, useState } from "react";
import { UploadFile } from "antd";
import { SelectGroup } from "@radix-ui/react-select";
import axios from "axios";
import { ProductWithImagesAndSizes } from "@/types/client/product.types";
import LoadingSpinner from "@/components/LoadingSpinner";
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
        url: z.string().optional(),
      })
    )
    .min(1, "At least one image is required"),
});

export default function EditWalletDialog({ productId }: { productId: number }) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [product, setProduct] = useState<ProductWithImagesAndSizes | null>(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "",
      category: "wallet",
      price: 0,
      quantity: 0,
      description: "",
      images: [] as { uid: string; name: string; originFileObj?: File }[],
      status: false,
    },
  });


  //* Fetch product details when the dialog opens
  useEffect(() => {
    if (!open) return; // Only run when the dialog is open

    async function fetchAndSetProduct() {
      setIsLoading(true);
      try {
        const response = await axios.get<{ product: ProductWithImagesAndSizes }>(
          `/api/admin/product/get-product?id=${productId}`
        );
        const productData = response.data.product;
        setProduct(productData);

        // Convert images to UploadFile format
        const imageFiles = productData.images.map((image) => ({
          uid: image.public_id,
          name: image.display_name,
          url: image.url,
        }));

        setFileList(imageFiles);

        // Reset form AFTER product is fetched
        form.reset({
          name: productData.name,
          color: productData.color,
          category: "wallet",
          price: Number(productData.price),
          quantity: productData.quantity ? Number(productData.quantity) : 0,
          description: productData.description,
          images: imageFiles, // Ensure images are correctly assigned
          status: productData.status,
        });
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAndSetProduct();
  }, [open]); // Runs whenever `open` changes

  // Helper function: convert an image URL to a File object.
  const urlToFile = async (url: string, filename: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  //* Handle form submission
  const onSubmit = async (data: any) => {
    setIsUpdating(true);
    const formData = new FormData();

    // Process images: if originFileObj exists, use it. If not, create a new File from the URL.
    const processedImages = await Promise.all(
      (data.images || []).map(async (file: any) => {
        if (file.originFileObj instanceof File) {
          // New file from the uploader
          return file.originFileObj;
        } else if (file.url) {
          // Fetched image: convert URL to a File object
          try {
            const newFile = await urlToFile(file.url, file.name);
            return newFile;
          } catch (error) {
            console.error("Error converting URL to file:", error);
            return null;
          }
        }
        return null;
      })
    );


    // Append processed images to the form data.
    processedImages.forEach((file) => {
      if (file) {
        formData.append("images", file);
      }
    });

    // Append all other fields to formData.
    Object.entries(data).forEach(([key, value]) => {
      if (key === "images") {
        // Skip images since they're already handled
        return;
      } else if (typeof value === "boolean" || typeof value === "number") {
        formData.append(key, value.toString());
      } else if (typeof value === "string") {
        formData.append(key, value);
      } else {
        console.warn(`Skipping key "${key}" with unsupported type:`, value);
      }
    });

    // Send formData to API
    const response = await axios.post(
      `/api/admin/product/update-product?id=${product?.id}`,
      formData
    );
    if (response.data.success) {
      setIsUpdating(false)
      setOpen(false);
      window.location.reload();
    }

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Edit</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Product</DialogTitle>
        </DialogHeader>

        {isLoading ? ( <div className="w-full flex justify-center"> <LoadingSpinner/> </div>) : (
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
                    render={() => (
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
                                  url: file.url
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
                        <Textarea placeholder="Description" {...field} className="max-h-40" />
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
                <Button type="submit" className="px-6 py-2" disabled={isUpdating}>
                  {isUpdating ? <ButtonLoadingSpinner/> : "Update Product"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
