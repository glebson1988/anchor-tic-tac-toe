import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TicTacToe } from "../target/types/tic_tac_toe";
import { expect } from "chai";

describe("tic-tac-toe", () => {
    const program = anchor.workspace.TicTacToe as Program<TicTacToe>;
    const programProvider = program.provider as anchor.AnchorProvider;

    it("setup game!", async () => {
        const gameKeypair = anchor.web3.Keypair.generate();
        const playerOne = programProvider.wallet;
        const playerTwo = anchor.web3.Keypair.generate();
        await program.methods
        .setupGame(playerTwo.publicKey)
        .accounts({
            game: gameKeypair.publicKey,
            playerOne: playerOne.publicKey,
        })
        .signers([gameKeypair])
        .rpc();

        let gameState = await program.account.game.fetch(gameKeypair.publicKey);
        expect(gameState.turn).to.equal(1);
        expect(gameState.players).to.eql([playerOne.publicKey, playerTwo.publicKey]);
        expect(gameState.state).to.eql({ active: {} });
        expect(gameState.board).to.eql([
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]);
    });
});
