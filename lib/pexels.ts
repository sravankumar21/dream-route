export interface PexelsImage {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

export async function searchPexels(query: string, perPage = 1): Promise<PexelsImage | null> {
  if (!PEXELS_API_KEY) {
    return null;
  }
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
        next: { revalidate: 86400 }, // 24h
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.photos?.[0] || null;
  } catch (error) {
    console.error("Pexels search error:", error);
    return null;
  }
}

// Curated fallback URLs per category/career to avoid API calls if key missing
export const categoryImages: Record<string, string> = {
  technology: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1600",
  medical: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1600",
  business: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1600",
  creative: "https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&w=1600",
  government: "https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=1600",
  engineering: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

export const careerImages: Record<string, string> = {
  "software-engineer": "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "data-scientist": "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ui-ux-designer": "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "cybersecurity-analyst": "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "cloud-devops-engineer": "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ai-ml-engineer": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "doctor-mbbs": "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "nurse-bsc": "https://images.pexels.com/photos/5214939/pexels-photo-5214939.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "pharmacist": "https://images.pexels.com/photos/356054/pexels-photo-356054.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "business-analyst": "https://images.pexels.com/photos/106344/pexels-photo-106344.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "chartered-accountant": "https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "product-manager": "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "digital-marketer": "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "graphic-designer": "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "civil-servant-upsc": "https://images.pexels.com/photos/11035386/pexels-photo-11035386.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "mechanical-engineer": "https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "electrical-engineer": "https://images.pexels.com/photos/6964170/pexels-photo-6964170.jpeg?auto=compress&cs=tinysrgb&w=1600",
};
