"use server";

export const searchPatient = async (formData: FormData) => {
  const radio = formData.get("inline-radio");
  const search = formData.get("search");
  let fetchResult;

  if (radio === "nama") {
    fetchResult = await prisma?.pasien.findMany({
      where: {
        nama_pasien: {
          contains: search as string,
        },
      },
    });
  } else if (radio === "nik") {
    fetchResult = await prisma?.pasien.findMany({
      where: {
        nik: {
          contains: search as string,
        },
      },
    });
  } else if (radio === "alamat") {
    fetchResult = await prisma?.pasien.findMany({
      where: {
        alamat_ktp: {
          contains: search as string,
        },
      },
    });
  } else if (radio === "nama_ibu") {
    fetchResult = await prisma?.pasien.findMany({
      where: {
        nama_ibu: {
          contains: search as string,
        },
      },
    });
  }

  return {
    data: fetchResult,
    success: true,
  };
};
