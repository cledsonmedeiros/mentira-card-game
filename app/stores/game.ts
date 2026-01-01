import { defineStore } from "pinia";

type Player = { id: string; name: string; score: number };

export const useGameStore = defineStore("game", {
  state: () => ({
    players: [] as Player[],
  }),
  actions: {
    init() {
      if (process.client) {
        const raw = localStorage.getItem("mentira-game");
        if (raw) {
          try {
            const data = JSON.parse(raw);
            this.players = data.players || [];
          } catch (e) {
            this.players = [];
          }
        }
        this.$subscribe((_, state) => {
          try {
            localStorage.setItem(
              "mentira-game",
              JSON.stringify({ players: state.players })
            );
          } catch (e) {
            // ignore
          }
        });
      }
    },
    addPlayer(name: string) {
      const id =
        typeof crypto !== "undefined" && (crypto as any).randomUUID
          ? (crypto as any).randomUUID()
          : String(Date.now());
      this.players.push({ id, name, score: 0 });
    },
    removePlayer(id: string) {
      this.players = this.players.filter((p) => p.id !== id);
    },
    inc(id: string) {
      const p = this.players.find((x) => x.id === id);
      if (p) p.score++;
    },
    dec(id: string) {
      const p = this.players.find((x) => x.id === id);
      if (p) p.score--;
    },
    resetScores() {
      this.players.forEach((p) => (p.score = 0));
    },
    clearAll() {
      this.players = [];
      if (process.client) localStorage.removeItem("mentira-game");
    },
  },
});
