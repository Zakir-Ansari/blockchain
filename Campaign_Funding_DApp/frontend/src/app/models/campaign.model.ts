export interface Campaign {
  id: number; // Converted BigInt to string
  owner: string;
  title: string;
  description: string;
  target: number; // Converted BigInt to string
  deadline: number; // Converted BigInt to string
  amountCollected: number; // Converted BigInt to string
  image: string;
  donators: string[];
  donations: number[];
  isDeleted: boolean;
}
