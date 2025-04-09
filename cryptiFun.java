import java.util.Scanner;

public class cryptiFun {

    public static String encode(String text) {
        StringBuilder encoded = new StringBuilder();
        for (char c : text.toUpperCase().toCharArray()) {
            if (c == ' ') {
                encoded.append('_');
            } else if (c >= 'A' && c <= 'Z') {
                int code = c - 'A' + 1;
                encoded.append(String.format("%02d", code));
            } else {
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
                decoded.append((char) (code + 64));
                i += 2;
            } else {
                decoded.append(c);
                i++;
            }
        }
        return decoded.toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter a Message to Encode:");
        String input = sc.nextLine();

        String encoded = encode(input);
        System.out.println("Encoded Message:");
        System.out.println(encoded);

        System.out.println("Enter a Message to Decode:");
        String toDecode = sc.nextLine();

        String decoded = decode(toDecode);
        System.out.println("Decoded Message:");
        System.out.println(decoded);
    }

}
