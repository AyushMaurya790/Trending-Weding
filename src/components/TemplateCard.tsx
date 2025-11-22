"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface TemplateCardProps {
  template: {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    slug?: string;
  };
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleEditClick = async () => {
    console.log("Edit button clicked!");
    if (!session) {
      console.log("No session, redirecting to login");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("/api/invites/create-draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: template._id,
        }),
      });
      if (response.ok) {
        const invite = await response.json();
        router.push(`/editor/${invite._id}`);
      } else {
        const errorData = await response.json();
        console.error("Failed to create/get draft:", errorData);
      }
    } catch (error) {
      console.error("Edit error:", error);
    }
  };

  const handleBuyClick = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    try {
      const response = await fetch("/api/payment/mock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: template._id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/editor/${data.inviteId}`);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 w-full">
        <Image
          src={template.imageUrl}
          alt={template.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{template.title}</h3>
        <p className="text-gray-600 mb-4">{template.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">
            ₹{template.price}
          </span>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/template/${template.slug}`}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-center hover:bg-gray-300 transition"
          >
            View Demo
          </Link>
          <button
            onClick={handleEditClick}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={handleBuyClick}
            className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
