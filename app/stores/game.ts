import { defineStore } from "pinia";
import { STORAGE_KEY } from "../utils/constants";

export type Player = { 
  id: string; 
  name: string; 
  score: number;
};

interface GameState {
  players: Player[];
}

export const useGameStore = defineStore("game", {
  state: (): GameState => ({
    players: [],
  }),
  getters: {
    sortedPlayers: (state): Player[] => {
      return [...state.players].sort((a, b) => b.score - a.score);
    },
    topPlayers(): Player[] {
      return this.sortedPlayers.slice(0, 3);
    },
    totalPoints: (state): number => {
      return state.players.reduce((sum, player) => sum + player.score, 0);
    },
  },
  actions: {
    init(): void {
      if (import.meta.client) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          try {
            const data = JSON.parse(raw) as { players?: Player[] };
            this.players = data.players || [];
          } catch (e) {
            this.players = [];
          }
        }
        this.$subscribe((_, state) => {
          try {
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({ players: state.players })
            );
          } catch (e) {
            // ignore
          }
        });
      }
    },
    addPlayer(name: string): void {
      const id = crypto.randomUUID?.() ?? String(Date.now());
      this.players.push({ id, name, score: 0 });
    },
    removePlayer(id: string): void {
      this.players = this.players.filter((p) => p.id !== id);
    },
    inc(id: string): void {
      const p = this.players.find((x) => x.id === id);
      if (p) p.score++;
    },
    dec(id: string): void {
      const p = this.players.find((x) => x.id === id);
      if (p) p.score--;
    },
    resetScores(): void {
      this.players.forEach((p) => (p.score = 0));
    },
    clearAll(): void {
      this.players = [];
      if (import.meta.client) localStorage.removeItem(STORAGE_KEY);
    },
  },
});
