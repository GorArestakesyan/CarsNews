import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function LogoutIcon({focused}: {focused?: boolean}) {
  return (
    <Svg
      width={52}
      height={52}
      viewBox="0 0 52 52"
      fill={focused ? '#fff' : 'none'}>
      <Path
        d="M2.778.254c-.416.157-1.092.608-1.491 1.007C-.1 2.65-.031 1.14.02 24.191l.052 20.466.486.833c.85 1.44 1.3 1.649 9.014 4.218 6.674 2.222 7.176 2.36 8.13 2.274 2.496-.226 3.952-2.066 3.952-4.982v-1.354l4.126-.07c4.541-.104 5.01-.19 6.466-1.25.433-.33 1.04-.954 1.352-1.423.988-1.51 1.057-1.996 1.057-8.071v-5.503l-.45-.538a1.563 1.563 0 00-2.34-.087l-.417.452-.087 5.693c-.086 5.416-.103 5.728-.45 6.18-.867 1.18-.919 1.197-5.287 1.25l-3.97.051-.035-17.41-.052-17.427-.433-.833c-.641-1.25-1.456-1.806-3.866-2.639l-2.114-.746h7.072c7.835-.018 7.87-.018 8.668 1.093.364.521.38.695.468 6.18.052 3.107.155 5.78.242 5.954.19.399 1.006.816 1.578.816.277 0 .658-.209.97-.521l.52-.521-.052-5.937c-.052-5.71-.069-5.988-.433-6.787-.537-1.145-1.82-2.464-2.982-3.02l-.97-.486L16.888.011C5.135-.023 3.454.011 2.778.254zm8.39 5.19c3.623 1.216 6.726 2.31 6.899 2.465.277.243.294 1.424.294 20.223 0 18.33-.017 19.996-.294 20.291-.156.174-.45.313-.642.313-.554 0-13.503-4.34-13.833-4.652-.294-.243-.312-1.424-.312-20.223 0-18.33.018-19.996.295-20.291.156-.174.45-.313.641-.313.208 0 3.329.99 6.952 2.187z"
        fill="#000"
      />
      <Path
        d="M41.382 13.238c-.555.313-.919 1.25-.676 1.84.087.226 1.37 1.632 2.86 3.107 1.49 1.476 2.704 2.743 2.704 2.812 0 .087-3.779.14-8.407.14-8.875 0-9.222.034-9.517.78-.225.625-.104 1.458.312 1.944l.416.486 8.598.087 8.598.087-2.687 2.69c-1.646 1.632-2.756 2.9-2.86 3.23-.364 1.075.399 1.978 1.63 1.978.658 0 .814-.139 4.905-4.218 2.34-2.309 4.351-4.409 4.49-4.67.572-1.093.555-1.11-4.316-5.988-4.906-4.912-4.906-4.912-6.05-4.305z"
        fill="#000"
      />
    </Svg>
  );
}

export default LogoutIcon;
