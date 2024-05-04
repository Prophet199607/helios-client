from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(options=chrome_options)
driver.get("http://35.187.242.96:3000")

def test_login():
    username_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[id='username']"))
    )
    password_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[id='password']"))
    )
    login_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))
    )

    username_input.send_keys("admin")
    password_input.send_keys("1234")
    login_button.click()

def test_registration():
    driver.get("http://your_website.com/registration_form")

    driver.find_element_by_id("firstName").send_keys("John")
    driver.find_element_by_id("lastName").send_keys("Doe")
    driver.find_element_by_id("email").send_keys("john.doe@example.com")
    driver.find_element_by_id("contactNumber").send_keys("1234567890")
    driver.find_element_by_id("nic").send_keys("123456789V")
    driver.find_element_by_id("address1").send_keys("123 Main St")
    driver.find_element_by_id("address2").send_keys("Apt 101")
    driver.find_element_by_id("userName").send_keys("johndoe")
    driver.find_element_by_id("password").send_keys("password123")

    driver.find_element_by_css_selector("button[type='submit']").click()

    time.sleep(2)

    assert "Registration successful" in driver.page_source

test_login()
test_registration()
driver.quit()
