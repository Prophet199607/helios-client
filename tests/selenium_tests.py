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
driver.get("http://34.126.175.155:3000")

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
    driver.get("http://34.126.175.155:3000/register")

    first_name_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[id='firstName']"))
    )
    last_name_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[id='lastName']"))
    )
    email_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[id='email']"))
    )
    contact_number_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[id='contactNumber']"))
    )
    nic_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[id='nic']"))
    )
    address1_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[id='address1']"))
    )
    address2_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[id='address2']"))
    )
    username_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[id='userName']"))
    )
    password_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[id='password']"))
    )
    register_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))
    )

    first_name_input.send_keys("John")
    last_name_input.send_keys("Doe")
    email_input.send_keys("johndoe@example.com")
    contact_number_input.send_keys("0715685623")
    nic_input.send_keys("199589566914")
    address1_input.send_keys("test address1")
    address2_input.send_keys("test address2")
    username_input.send_keys("john")
    password_input.send_keys("password123")
    register_button.click()

    assert "Registration successful" in driver.page_source

test_login()
test_registration()
driver.quit()
