# “As a user, I want to generate an image for my playlists.”

*User Story 2* 

1. Homepage is just the tool with a text bar to paste a link to a playlist and a button to sign into Spotify. The user can either use the sign-in button to sign into Spotify to access their own Spotify playlists, or they can just use the tool without signing in by pasting Spotify playlist links into the text bar. 
2. If the user is not signed into Spotify on the website, they can still use the image generator tool by pasting Spotify playlist links into the text bar on the home page and clicking the generate image button. But if the text that the user inputs into the text bar is not a valid Spotify playlist link, then the user will receive an error message notifying them accordingly. If the user inputs the link to a private Spotify playlist, then they will receive an error message saying that they do not have access to that playlist. Otherwise, if the text the user inputs is a link to a valid Spotify playlist, the application will output an image based on the playlist input by the user and display it below the text bar and the generate image button. The user will then have the option to download this image. 
3. Once they have logged in (see [User Story 1](1-I-want-to-log-in.md)), the login buttons are replaced by who they’re logged in as, and a list of their personal playlists they have access to appears underneath the tool on the homepage 
  * “I want to search for one of my specific playlists”
    1. The user texts into the search bar above their playlists
    2. The playlists get filtered out as the user types for matching names
    3. They can also use a date created filter to find their playlists easier.
4. User can generate an image to a playlist they have access to
  * User can hover over a playlist it shows and click “generate playlist cover” 
  * User can paste a link to the playlist and click “generate playlist cover”
5. While the image is being generated, a cool and fun wacky loading screen pops up until it is done
6. A result screen will show up with the image and what they can do with it-- user can “use a generated image as cover for their playlist” (see [User Story 4](4-I-want-to-see-images-I-have-generated.md)) or download the image directly 
