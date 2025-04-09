import java.util.Scanner;

public class cryptiFun {

    public static String encode(String text){
        StringBuilder encoded = new StringBuilder();
        for(char c : text.toCharArray()) {
            if(c == ' ') {
                encoded.append('_');
            }
            else if (c >= 'a' && c <= 'z') {
                int code = c - 'a' + 1;
                encoded.append(String.format("%02d", code));
            }
            else if (c >= 'A' && c <= 'Z') {
                int code = c - 'A' + 27;
                encoded.append(String.format("%02d", code));
            }
            else {
                encoded.append(c);
            }
        }
        return encoded.toString();
    }

    public static String decode(String text) {
        StringBuilder decoded = new StringBuilder();
        int i = 0;
        while (i < text.length()) {
            char c = text.charAt(i);
            if (c == '_') {
                decoded.append(' ');
                i++;
            } else if (i + 1 < text.length() && Character.isDigit(c) && Character.isDigit(text.charAt(i + 1))) {
                int code = Integer.parseInt(text.substring(i, i + 2));
                if (code >= 1 && code <= 26) {
                    decoded.append((char) ('a' + code - 1)); // 1 → 'a', 2 → 'b', ..., 26 → 'z'
                } else if (code >= 27 && code <= 52) {
                    decoded.append((char) ('A' + code - 27)); // 27 → 'A', 28 → 'B', ..., 52 → 'Z'
                } else {
                    decoded.append('?'); // fallback for unexpected codes
                }
                i += 2;
            } else {
                decoded.append(c); // for symbols or non-digit characters
                i++;
            }
        }
        return decoded.toString();
    }

    public static void main(String[] Args){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter a Message to Encode");
        String myText = sc.nextLine();
        
        String  encoded = encode(myText);
        System.out.println("Encoded Message");
        System.out.println(encoded);

        System.out.println("Enter a Message to Decode");
        String myDecode = sc.nextLine();
        
        String decoded = decode(myDecode);
        System.out.println("Decoded Message");
        System.out.println(decoded);
    }

}
