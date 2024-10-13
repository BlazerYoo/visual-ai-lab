import java.util.Scanner;

class addNews{
        public static void main(String[] args){
                Scanner in = new Scanner(System.in);
                System.out.println("What is the month and year of the news? (ex. May 2020)");
                String date = in.nextLine();

                System.out.println("What is the news?");
                String news = in.nextLine();

                System.out.println("Put the text below into 'index.html' by typing in command: 'vi index.html' *make sure to include the tabs!");
                System.out.println("                    <tr>");
                System.out.println("                        <td id=\"date\">" + date + "</td>");
                System.out.println("                        <td>" + news + "</td>");
                System.out.println("                    </tr>");
        }
}
