export interface Campaign {
  id: number; // Converted BigInt to string
  owner: string;
  title: string;
  description: string;
  target: number; // Converted BigInt to string
  deadline: number; // Converted BigInt to string
  amountCollected: number; // Converted BigInt to string
  image: string;
  totalDonation: number;
  isDeleted: boolean;
  donatorDonations?: DonatorDonations[];
}

export interface DonatorDonations {
  donator: string;
  donation: number;
}
