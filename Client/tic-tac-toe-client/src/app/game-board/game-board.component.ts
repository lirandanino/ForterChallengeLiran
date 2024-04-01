import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent {
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  gameOverMessage: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  makeMove(row: number, col: number): void {
    if (this.board[row][col] === '') {
      this.http.post<any>('http://localhost:3000/move', { row, col }).subscribe({
        next: (response ) => {
          if (response.result === 'win') {
            this.gameOverMessage = `Player ${response.winner} wins!`;
            console.log('Player ' + response.winner + ' wins!');
          } else if (response.result === 'tie') {
            this.gameOverMessage = `It's a tie!`;
            console.log('It\'s a tie!');
          } else {
            console.log('Move successful');
          }
          this.board = response.board;
        },
        error: (e) => console.error('Error making move:', e) 
      });
    } else {
      console.log('Invalid move');
    }
  }
 
  newGame(): void {
    this.http.post<any>('http://localhost:3000/new-game', {}).subscribe({
      next: (response ) => {
        this.board = response.board;
        this.gameOverMessage = null; // Reset game over message
        console.log('New game started');
      },
      error: (e) => console.error('Error starting new game:', e) 
    });
  }
}
