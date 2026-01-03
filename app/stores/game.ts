import { defineStore } from "pinia";
import { STORAGE_KEY } from "../utils/constants";

export type Player = { 
  id: string; 
  name: string; 
  score: number;
};

interface GameState {
  players: Player[];
  pointValue: number; // Valor em reais de cada ponto
  gameFinished: boolean;
  winnerId: string | null;
}

export const useGameStore = defineStore("game", {
  state: (): GameState => ({
    players: [],
    pointValue: 0,
    gameFinished: false,
    winnerId: null,
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
    totalMoney(): number {
      return this.totalPoints * this.pointValue;
    },
    hasMonetaryValue: (state): boolean => {
      return state.pointValue > 0;
    },
    winner: (state): Player | null => {
      return state.players.find(p => p.id === state.winnerId) || null;
    },
    winnerPayout(): number {
      if (!this.winner || !this.hasMonetaryValue) return 0;
      // Vencedor recebe o valor de todos os outros jogadores
      const otherPlayers = this.players.filter(p => p.id !== this.winnerId);
      return otherPlayers.reduce((total, player) => total + (player.score * this.pointValue), 0);
    },
  },
  actions: {
    init(): void {
      if (import.meta.client) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          try {
            const data = JSON.parse(raw) as { players?: Player[]; pointValue?: number; gameFinished?: boolean; winnerId?: string | null };
            this.players = data.players || [];
            this.pointValue = data.pointValue || 0;
            this.gameFinished = data.gameFinished || false;
            this.winnerId = data.winnerId || null;
          } catch (e) {
            this.players = [];
            this.pointValue = 0;
            this.gameFinished = false;
            this.winnerId = null;
          }
        }
        this.$subscribe((_, state) => {
          try {
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({ 
                players: state.players, 
                pointValue: state.pointValue,
                gameFinished: state.gameFinished,
                winnerId: state.winnerId
              })
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
      this.gameFinished = false;
      this.winnerId = null;
    },
    setPointValue(value: number): void {
      this.pointValue = Math.max(0, value);
    },
    finishGame(winnerId: string): void {
      this.gameFinished = true;
      this.winnerId = winnerId;
    },
    startNewRound(): void {
      this.resetScores();
    },
    clearAll(): void {
      this.players = [];
      this.pointValue = 0;
      this.gameFinished = false;
      this.winnerId = null;
      if (import.meta.client) localStorage.removeItem(STORAGE_KEY);
    },
  },
});
