import tkinter as tk

# Creates a window
root = tk.Tk()

# Sets the dimensions of window
root.geometry("500x500")
root.title("My First GUI")

# Add Label
label = tk.Label(root, text="Hello World", font=('Arial', 18))
# Adds padding to Label
label.pack(padx = 20, pady = 20)

# Add Textbox
# Height is num of lines, width is columns
textbox = tk.Text(root, height = 3, font=('Arial, 16'))
textbox.pack(padx = 10)

# Entry is only one line, 'return' is not allowed and is mainly used for password
myentry = tk.Entry(root, width=30)
myentry.pack(pady = 10)

# Add button
button = tk.Button(root, text="Click Me!")
button.pack(padx = 10, pady = 10)

# Runs and opens the window
root.mainloop()