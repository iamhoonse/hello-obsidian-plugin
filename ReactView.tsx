import {createContext, type FC, StrictMode, useContext} from "react";
import {createRoot, Root} from "react-dom/client";
import {App, ItemView} from "obsidian";
import * as React from "react";

export const AppContext = createContext<App | null>(null);

export const useAppContext = () => useContext(AppContext);

export const ReactView: FC = () => {
	const app = useAppContext();
	// @ts-ignore
	const { vault } = app;
	return (
		<h4>
			vault name : {vault.getName()}
		</h4>
	)
}

export class ExampleView extends ItemView {
	static VIEW_TYPE_EXAMPLE = "example-view";
	static VIEW_TYPE_LABEL = "Example View";

	root: Root | null = null

	constructor(leaf: ConstructorParameters<typeof ItemView>[0]) {
		super(leaf);
	}

	getViewType(): string {
		return ExampleView.VIEW_TYPE_EXAMPLE;
	}

	getDisplayText(): string {
		return ExampleView.VIEW_TYPE_LABEL;
	}

	async onOpen() {
		this.root = createRoot(this.containerEl.children[1]);
		this.root.render(
			<StrictMode>
				<AppContext.Provider value={this.app}>
					<ReactView />
				</AppContext.Provider>
			</StrictMode>
		);
	}

	async onClose() {
		this.root?.unmount();
	}
}
