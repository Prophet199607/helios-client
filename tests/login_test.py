from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set Chrome options for headless mode
chrome_options = Options()
chrome_options.add_argument("--headless")

# Assuming you have downloaded the appropriate WebDriver for your browser and placed it in your PATH
# For example, Chrome WebDriver: https://sites.google.com/a/chromium.org/chromedriver/downloads
driver = webdriver.Chrome(options=chrome_options)

# Open the Vue 3 app
driver.get("http://localhost:3000")

# Find the login elements by their CSS selectors or other attributes
username_input = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, "input[id='username']"))
)
password_input = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, "input[id='password']"))
)
login_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))
)

# Enter your login credentials
username_input.send_keys("admin")
password_input.send_keys("1234")

# Click the login button
login_button.click()

# Optionally, you can wait for some element that confirms successful login to appear
# For example, if there's a logout button, wait for it to be visible
# logout_button = WebDriverWait(driver, 10).until(
#     EC.visibility_of_element_located((By.CSS_SELECTOR, "button.logout"))
# )

# Once you're done, you can close the browser
driver.quit()