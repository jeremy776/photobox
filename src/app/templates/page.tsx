"use client";
import { useRouter } from "next/navigation";
import Footer from "../../components/Footer";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";

export default function Template() {
  const [selected, setSelected] = useState<string | null>(null);
  const [templates, setTemplates] =
    useState<{ label: string; filename: string }[]>();

  const onSelect = (value: string) => {
    setSelected(value);
  };

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data.data))
      .catch((err) => console.error("Error fetching templates:", err));
  }, []);

  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-10 mb-20 min-h-screen">
        <div className="flex flex-col items-center max-w-6xl md:p-5 rounded-xl w-full">
          <h2 className="text-center text-4xl font-semibold">Template Foto</h2>
          <p className="text-center">
            Kami menyediakan beberapa template foto yang bisa kamu gunakan
          </p>

          <div className="mt-10 place-content-around w-[100%] grid grid-cols-2 md:grid-cols-4 gap-4">
            {templates?.map((template, index) => (
              <div
                key={index}
                className={`w-full cursor-pointer transition-all ease-in-out rounded-xl border border-gray-200/20 p-4 shadow-md ${
                  selected === template.label
                    ? "bg-primary/40"
                    : "hover:bg-primary/20"
                }`}
                onClick={() => onSelect(template.label)}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-lg font-medium">{template.label}</p>
                  <input
                    type="radio"
                    name="template"
                    className="radio hidden"
                    checked={selected === template.label}
                    onChange={() => onSelect(template.label)}
                  />
                  <Image
                    className="rounded-md"
                    src={`/template/${template.filename}`}
                    alt={template.label}
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div className="bg-gradient-to-t mb-2 via-base-200 h-[100px] rounded-2xl from-base-200 sticky bottom-0 w-full p-5">
          <div className="relative w-full h-full flex items-center justify-center max-w-xl mx-auto">
            <button
              onClick={() => {
                router.push("/getstarted?t=" + selected);
              }}
              className="btn btn-success w-full absolute left-0 bottom-0"
            >
              Gunakan template ini
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
