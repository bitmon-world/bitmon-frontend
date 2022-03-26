import { withImageProxy } from "@blazity/next-image-proxy";

export default withImageProxy({
  whitelistedPatterns: [
    /^https?:\/\/(.*).ipfs.nftstorage.link/,
    /^https?:\/\/arweave.net.*/,
    /^https?:\/\/ipfs.io.*/,
  ],
});
