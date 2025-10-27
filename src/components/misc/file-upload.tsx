"use client";

import React, { useState, useRef, DragEvent } from "react";
import { ImageKitProvider, Image } from "@imagekit/next";
import {
  upload,
  UploadOptions,
  UploadResponse as IKUploadResponse,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitUploadNetworkError,
  ImageKitServerError,
} from "@imagekit/javascript";
import config from "@/lib/config";
import { toast } from "sonner";

interface AuthResponse {
  token: string;
  signature: string;
  expire: number;
}

interface Props {
  maxSizeMB?: number;
  onFilesChange?: (urls: string[]) => void;
  maxFiles?: number;
}

const FileUploader: React.FC<Props> = ({
  maxSizeMB = 50,
  onFilesChange,
  maxFiles = 5,
}) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validateFile = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(
        `Arquivo muito grande. O arquivo deve ter menos de ${maxSizeMB}MB.`
      );
      return false;
    }
    if (uploadedImages.length >= maxFiles) {
      toast.error(`Você pode enviar no máximo ${maxFiles} imagens.`);
      return false;
    }
    return true;
  };

  const handleUpload = async (file: File) => {
    if (!validateFile(file)) return;

    setUploading(true);
    setProgress(0);

    try {
      const res = await fetch(`${config.env.apiEndpoint}/api/imagekit`);
      if (!res.ok) throw new Error("Falha ao obter token ImageKit");

      const data: AuthResponse = await res.json();

      const uploadOptions: UploadOptions = {
        file,
        fileName: file.name,
        folder: "/uploads",
        useUniqueFileName: true,
        token: data.token,
        signature: data.signature,
        expire: data.expire,
        publicKey: config.env.imagekit.publicKey,
        onProgress: (event: ProgressEvent<EventTarget>) => {
          if (event.lengthComputable) {
            setProgress(Math.round((event.loaded / event.total) * 100));
          }
        },
      };

      const response: IKUploadResponse = await upload(uploadOptions);

      if (!response.url) throw new Error("Upload não retornou URL");

      setUploadedImages((prev) => {
        const newList = [...prev, response.url!];
        setTimeout(() => onFilesChange?.(newList), 0);
        return newList;
      });

      toast.success(`${file.name} enviado com sucesso!`);
    } catch (error) {
      let message = "Erro desconhecido";

      if (error instanceof ImageKitAbortError)
        message = `Upload abortado: ${error.reason}`;
      else if (error instanceof ImageKitInvalidRequestError)
        message = `Requisição inválida: ${error.message}`;
      else if (error instanceof ImageKitUploadNetworkError)
        message = `Erro de rede: ${error.message}`;
      else if (error instanceof ImageKitServerError)
        message = `Erro do servidor: ${error.message}`;
      else if (error instanceof Error) message = error.message;

      toast.error(message);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleUpload(file);
  };

  // Drag & Drop
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => setDragOver(false);

  const removeImage = (index: number) => {
    setUploadedImages((prev) => {
      const newList = prev.filter((_, i) => i !== index);
      setTimeout(() => onFilesChange?.(newList), 0);
      return newList;
    });
  };

  const setAsCover = (index: number) => {
    setUploadedImages((prev) => {
      const newList = [...prev];
      const selected = newList.splice(index, 1)[0];
      if (!selected) return prev;
      newList.unshift(selected);
      setTimeout(() => onFilesChange?.(newList), 0);
      return newList;
    });
  };

  return (
    <ImageKitProvider urlEndpoint={config.env.imagekit.urlEndpoint}>
      <div className="p-4 border rounded-lg w-full max-w-md mx-auto flex flex-col gap-4">
        <h1 className="text-lg font-semibold">Upload de Imagens</h1>
        <p className="text-sm text-gray-500">
          Arraste ou selecione até {maxFiles} imagens. A primeira será a capa
          principal.
        </p>

        {/* Área de drag & drop */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-dashed border-2 rounded-lg p-6 flex items-center justify-center cursor-pointer transition ${
            dragOver
              ? "border-blue-500 bg-primary"
              : "border-gray-300 bg-background-secondary"
          }`}
        >
          {uploading
            ? "Enviando..."
            : "Clique ou arraste para adicionar imagens"}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {progress > 0 && progress < 100 && (
          <div className="w-full bg-gray-200 h-2 rounded overflow-hidden mt-2">
            <div
              className="bg-blue-600 h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Previews */}
        {uploadedImages.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {uploadedImages.map((url, index) => (
              <div
                key={url}
                className={`relative border rounded overflow-hidden ${
                  index === 0 ? "border-2 border-blue-600" : "border"
                }`}
              >
                <Image
                  src={url}
                  width={150}
                  height={150}
                  alt={`Uploaded ${index}`}
                  className="object-cover w-full h-32"
                />
                <div className="absolute bottom-1 left-1 flex flex-col gap-1">
                  {index === 0 && (
                    <span className="bg-blue-600 text-white px-2 py-0.5 text-xs rounded">
                      Capa
                    </span>
                  )}
                </div>
                <div className="absolute top-1 right-1 flex flex-col gap-1">
                  {index !== 0 && (
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 cursor-pointer"
                      onClick={() => setAsCover(index)}
                    >
                      Tornar capa
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 cursor-pointer"
                    onClick={() => removeImage(index)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ImageKitProvider>
  );
};

export default FileUploader;
