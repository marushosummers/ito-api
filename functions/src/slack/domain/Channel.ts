export type Channel = {
  "id": string;
  "dealerId": string;
  "players": PlayerMap[];
}

export type PlayerMap = {
  "id": string;
  "itoId": string;
  "cards"?: number[]
}
