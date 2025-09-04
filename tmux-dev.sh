#!/usr/bin/env bash
SESSION_NAME="laravel-dev"
INSIDE_TMUX="${TMUX:-}"

if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
  [ -n "$INSIDE_TMUX" ] && tmux switch-client -t "$SESSION_NAME" || tmux attach -t "$SESSION_NAME"
  exit 0
fi

tmux new-session -d -s "$SESSION_NAME" -c "$PWD"
tmux rename-window -t "$SESSION_NAME:1" "dev-server"

tmux split-window -h -t "$SESSION_NAME:1"
tmux split-window -v -t "$SESSION_NAME:1.2"

tmux send-keys -t "$SESSION_NAME:1.2" "npm run dev" C-m
tmux send-keys -t "$SESSION_NAME:1.3" "tail -f storage/logs/laravel.log" C-m

[ -n "$INSIDE_TMUX" ] && tmux switch-client -t "$SESSION_NAME" || tmux attach -t "$SESSION_NAME"
