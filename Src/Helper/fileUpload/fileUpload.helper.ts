export function transformImageName(image: string) {
  const imageName = image.split(".");
  // Add timestamp at the end
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:.]/g, "")
    .replace("T", "")
    .substring(0, 14);
  const uniqueName = imageName[0] + "_" + timestamp;
  // Replace spaces and hyphens with underscores
  const transformedName = uniqueName.replace(/[-\s]/g, "_");
  return transformedName + "." + imageName[1];
}
