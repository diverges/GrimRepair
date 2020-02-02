export interface SceneProps<S, E> {
    onSceneEnd(endState?: E): void;
    onSceneStart?(startState?: S): void
}