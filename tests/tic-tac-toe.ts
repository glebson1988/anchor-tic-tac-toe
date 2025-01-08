import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TicTacToe } from "../target/types/tic_tac_toe";
import { expect } from "chai";

async function play(
    program: Program<TicTacToe>,
    game,
    player,
    tile,
    expectedTurn,
    expectedGameState,
    exptectedBoard
) {
    await program.methods
    .play(tile)
    .accounts({
        player: player.publicKey,
        game,
    })
    .signers(player instanceof (anchor.Wallet as any) ? [] : [player])
    .rpc()

    const gameState = await program.account.game.fetch(game);
    expect(gameState.turn).to.equal(expectedTurn);
    expect(gameState.state).to.eql(expectedGameState);
    expect(gameState.board).to.eql(exptectedBoard);
}

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
