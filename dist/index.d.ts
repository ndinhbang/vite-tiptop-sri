import { Plugin } from 'vite';

declare module "vite" {
    interface ManifestChunk {
        integrity: string;
    }
}
type IAlgos = "sha256"[] | "sha384"[] | "sha512"[] | string[];
interface ISRIOptions {
    selectors?: string[];
    hashAlgorithms?: IAlgos;
    crossOriginPolicy?: "anonymous" | "use-credentials";
    indexHtmlPath?: string;
    manifestsPaths?: string[];
    augmentManifest?: boolean;
    filesToIgnore?: string[];
}
type IPlugin = (options?: ISRIOptions) => Plugin;

declare const pluginSetup: IPlugin;

export { pluginSetup as default };
