namespace ListingLand.Helpers
{
    public class Db_Image_Helper
    {
       
        public static string Get_Db_Image(byte[] ImageData)
        {
            if (ImageData == null)
                return $"images/no-image-available.jpeg";

            string imageBase64Data = Convert.ToBase64String(ImageData);
            string imageDataURL = string.Format("data:image/jpg;base64,{0}", imageBase64Data);
            return imageDataURL;
        }
    }
}
