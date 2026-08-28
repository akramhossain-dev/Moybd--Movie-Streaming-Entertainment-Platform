import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String },
    slug: { type: String, unique: true, sparse: true, index: true },
    bgposter: { type: String },
    smposter: { type: String },
    titlecategory: { type: String },
    description: { type: String },
    rating: { type: String },
    duration: { type: String },
    year: { type: String },
    genre: { type: Array },
    language: { type: String },
    subtitle: { type: String },
    size: { type: String },
    quality: { type: String },
    youtubelink: { type: String },
    category: { type: String },
    watchonline: { type: String },
    downloadlink: {
      "360p": { type: String },
      "480p": { type: String },
      "720p": { type: String },
      "1080p": { type: String },
      "4k": { type: String },
    },
    episodes: [
      {
        episodeNumber: { type: String },
        title: { type: String },
        downloadlink: {
          "480p": { type: String },
          "720p": { type: String },
          "1080p": { type: String },
        },
        watchonline: { type: String },
      },
    ],
    zipDownloadLink: {
      "480p": { type: String },
      "720p": { type: String },
      "1080p": { type: String },
    },
    status: { type: String },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  { timestamps: true }
);

MovieSchema.index({ status: 1, category: 1 });
MovieSchema.index({ status: 1, titlecategory: 1 });

const Movie = mongoose.model("movie", MovieSchema);

export default Movie;
