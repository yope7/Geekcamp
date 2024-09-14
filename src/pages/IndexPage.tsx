import { Game1, Game2, Game3 } from "../components";

export function IndexPage(): JSX.Element {
    return (
        <div>
            <h1>Index Page</h1>
            <p>This is the index page.</p>
            <Game1 />
            <Game2 />
            <Game3 />
        </div>
    );
}
