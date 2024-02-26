"use client";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";

export default function FileUpload({
  onData,
}: {
  onData: (data: string) => void;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [showButton, setShowButton] = useState(true);
  const handleUpload = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(`/api/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;

    setBlob(newBlob);
    onData(newBlob.url);
    setShowButton(false);
  };

  return (
    <>
      <h1 className="text-l">Unggah Foto Penyerahan</h1>
      <input
        type="file"
        className="w-64 border-2 border-gray-300 rounded-md p-2"
        ref={inputFileRef}
      />
      {showButton && (
        <button
          className="bg-purple-400 text-white rounded-md p-3 mt-3 ml-2 border-1 border-gray-300 shadow-xl hover:bg-purple-500"
          onClick={handleUpload}
        >
          Unggah
        </button>
      )}
    </>
  );
}
