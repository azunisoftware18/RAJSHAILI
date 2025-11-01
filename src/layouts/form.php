/** <!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Member Registration Form</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
  <!-- SweetAlert2 JS -->
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="style.css">
  <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
</head>
<style>
  a {
    text-decoration: none;
  }

  h1 {
    text-align: center;
  }

  h2 {
    margin: 0;
  }

  #multi-step-form-container {
    margin-top: 2rem;
  }

  .text-center {
    text-align: center;
  }

  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }

  .pl-0 {
    padding-left: 0;
  }

  .button {
    padding: 0.7rem 1.5rem;
    border: 1px solid #4361ee;
    background-color: #4361ee;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }

  .submit-btn {
    border: 1px solid #0e9594;
    background-color: #652B7C;
  }

  .mt-3 {
    margin-top: 2rem;
    align-items: center;
    text-align: center;
  }

  .d-none {
    display: none;
  }

  .form-step {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 3rem;
  }

  .font-normal {
    font-weight: normal;
  }

  ul.form-stepper {
    counter-reset: section;
    margin-bottom: 3rem;
  }

  ul.form-stepper .form-stepper-circle {
    position: relative;
  }

  ul.form-stepper .form-stepper-circle span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  .form-stepper-horizontal {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  ul.form-stepper>li:not(:last-of-type) {
    margin-bottom: 0.625rem;
    -webkit-transition: margin-bottom 0.4s;
    -o-transition: margin-bottom 0.4s;
    transition: margin-bottom 0.4s;
  }

  .form-stepper-horizontal>li:not(:last-of-type) {
    margin-bottom: 0 !important;
  }

  .form-stepper-horizontal li {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: start;
    -webkit-transition: 0.5s;
    transition: 0.5s;
  }

  .form-stepper-horizontal li:not(:last-child):after {
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 1px;
    content: "";
    top: 32%;
  }

  .form-stepper-horizontal li:after {
    background-color: #dee2e6;
  }

  .form-stepper-horizontal li.form-stepper-completed:after {
    background-color: #4da3ff;
  }

  .form-stepper-horizontal li:last-child {
    flex: unset;
  }

  ul.form-stepper li a .form-stepper-circle {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 0;
    line-height: 1.7rem;
    text-align: center;
    background: rgba(0, 0, 0, 0.38);
    border-radius: 50%;
  }

  .form-stepper .form-stepper-active .form-stepper-circle {
    background-color: #652B7C !important;
    color: #fff;
  }

  .form-stepper .form-stepper-active .label {
    font-size: 16px !important;
    line-height: 24px !important;
    color: #212529 !important;
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
  }

  .form-stepper .form-stepper-active .form-stepper-circle:hover {
    background-color: #931bc3 !important;
    color: #fff !important;
  }

  .form-stepper .form-stepper-unfinished .form-stepper-circle {
    background-color: #f8f7ff;
  }

  .form-stepper .form-stepper-completed .form-stepper-circle {
    background-color: #931bc3 !important;
    color: #fff;
  }

  .form-stepper .form-stepper-completed .label {
    font-size: 16px !important;
    line-height: 24px !important;
    color: #212529 !important;
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
  }

  .form-stepper .form-stepper-completed .form-stepper-circle:hover {
    background-color: #0e9594 !important;
    color: #fff !important;
  }

  .form-stepper .form-stepper-active span.text-muted {
    color: #fff !important;
  }

  .form-stepper .form-stepper-completed span.text-muted {
    color: #fff !important;
  }

  .form-stepper .label {
    font-size: 1rem;
    margin-top: 0.5rem;
  }

  .form-stepper a {
    cursor: default;
  }

  .container {
    width: 100%;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }

  .container header {
    font-size: 1.5rem;
    color: #333;
    font-weight: 500;
    text-align: center;
  }

  .container .form {
    margin-top: 30px;
  }

  .form .input-box {
    width: 100%;
    margin-top: 20px;
  }

  .input-box label {
    color: #333;
  }

  .form :where(.input-box input, .select-box) {
    position: relative;
    height: 50px;
    width: 100%;
    outline: none;
    font-size: 1rem;
    color: #707070;
    margin-top: 8px;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 0 15px;
  }

  .input-box input:focus {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  }

  .form .column {
    display: flex;
    column-gap: 15px;
  }

  .form .gender-box {
    margin-top: 20px;
  }

  .gender-box h3 {
    color: #333;
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 8px;
  }

  .form :where(.gender-option, .gender) {
    display: flex;
    align-items: center;
    column-gap: 50px;
    flex-wrap: wrap;
  }

  .form .gender {
    column-gap: 5px;
  }

  .gender input {
    accent-color: rgb(130, 106, 251);
  }

  .form :where(.gender input, .gender label) {
    cursor: pointer;
  }

  .gender label {
    color: #707070;
  }

  .address :where(input, .select-box) {
    margin-top: 15px;
  }

  .select-box select {
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    color: #707070;
    font-size: 1rem;
  }

  .form button {
    height: 55px;
    width: 100%;
    color: #fff;
    font-size: 1rem;
    font-weight: 400;
    margin-top: 30px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #652B7C;
  }

  .form button:hover {
    background: #652B7C;
  }

  /*Responsive*/
  @media screen and (max-width: 500px) {
    .form .column {
      flex-wrap: wrap;
    }

    .form :where(.gender-option, .gender) {
      row-gap: 15px;
    }
  }

  .sel {
    position: relative;
    top: 27px;
    width: 100%;
    height: 48%;
    border: 1px solid rgb(214, 211, 206);
    border-radius: 5px;
  }

  .sa {
    width: 100%;
    height: 50px;
    border: 1px solid rgb(214, 211, 206);
    border-radius: 5px;
  }

  .sa3 {
    position: relative;
    top: 2px;
    top: 10px;
    width: 100%;
    height: 52%;
    border: 1px solid rgb(214, 211, 206);
    border-radius: 5px;
  }

  .label {
    position: relative;
    top: 25px;
  }

  .hide {
    display: none;
  }

  .btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    color: #333333;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border: 1px solid #ddd;
    box-shadow: 2px 2px 10px #eee;
    border-radius: 4px;
  }

  .btn-large {
    padding: 11px 19px;
    font-size: 17.5px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  #imagePreview {
    margin: 15px 0 0 0;
    border: 2px solid #ddd;
  }
</style>

<body>
  <div>
    <img src="logo.png" alt="">
    <h1>Membership Application Form</h1>
    <div id="multi-step-form-container">
      <!-- Form Steps / Progress Bar -->
      <ul class="form-stepper form-stepper-horizontal text-center mx-auto pl-0">
        <!-- Step 1 -->
        <li class="form-stepper-active text-center form-stepper-list" step="1">
          <a class="mx-2">
            <span class="form-stepper-circle">
              <span>1</span>
            </span>
            <div class="label">Personal Details</div>
          </a>
        </li>
        <!-- Step 2 -->
        <li class="form-stepper-unfinished text-center form-stepper-list" step="2">
          <a class="mx-2">
            <span class="form-stepper-circle text-muted">
              <span>2</span>
            </span>
            <div class="label text-muted">Payment Details</div>
          </a>
        </li>
        <!-- Step 3 -->
        <li class="form-stepper-unfinished text-center form-stepper-list" step="3">
          <a class="mx-2">
            <span class="form-stepper-circle text-muted">
              <span>3</span>
            </span>
            <div class="label text-muted">Final Submit</div>
          </a>
        </li>
      </ul>
      <form id="userAccountSetupForm" class="form" action="form_action.php" method="POST" enctype="multipart/form-data">
     
        <section id="step-1" class="form-step">
          <div class="column">
            <div class="input-box">
              <label>Title</label>
              <select name="title" id="title" class="sa3" required>
                <option value="select">Select</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss.">Miss.</option>
                <option value="Dr.">Dr.</option>
              </select>
            </div>
            <div class="input-box">
              <label>First Name</label>
              <input type="text" name="name" id="fname" style="width: 93%;" placeholder="Enter First Name" required />
            </div>
            <div class="input-box">
              <label>Last Name</label>
              <input type="text" name="lname" id="lname" placeholder="Enter Last Name" required />
            </div>
           
          </div>
          <label for="gender">Gender</label>
          <select name="gender" id="gender" class="sa">
            <option value="select">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <div class="input-box">
            <label>Personal Email</label><BR>
            <input type="email" name="email" id="email" placeholder="Enter  Personal Email" required />
          </div>
          <div class="input-box">
            <label>Phone Number</label>
            <input name="number" id="phone" maxlength="10" placeholder="Enter Phone Number" required />
          </div>
          <div class="input-box">
            <label>Residential Address</label>
            <input type="text" name="address1" id="address1" placeholder="Enter  Residential Address" required />
          </div>
          <label for="designation">Designation</label>
          <select name="designation" id="designation" class="sa">
            <option value="select">Select</option>
            <option value="Vice chancellor">Vice chancellor</option>
            <option value="Senior Professor">Senior professor</option>
            <option value="Eminent professor">Eminent professor</option>
            <option value="Professor">Professor</option>
            <option value="Associate professor">Associate professor</option>
            <option value="Assistant professor">Assistant professor</option>
            <option value="Principal">Principal</option>
            <option value="Dean">Dean</option>
            <option value="Scholar">Scholar</option>
            <option value="Student">Student</option>
          </select>
          <div class="input-box">
            <label>Department</label>
            <input type="text" id="department" name="department" placeholder="Enter Department" required />
          </div>
          <div class="input-box">
            <label>College/University</label>
            <input type="text" name="college" id="college" placeholder="Enter College/University" required />
          </div>
          <div class="input-box">
            <label>Official Email</label>
            <input type="Email" name="email1" id="email1" placeholder="Enter  Official Email" required />
          </div>
          <div class="input-box">
            <label>Official Address</label>
            <input type="text" name="address" id="address" placeholder="Enter  Official Address" required />
          </div>
          <select hidden name="memberid" id="memberid" class="sa">
            <option value="Member Id Not Alloted">Member Id Not Alloted</option>
          </select>
          <div class="column">
            <div class="input-box">
              <label>City</label>
              <br>
              <input type="text" name="city" id="city" style="width: 93%;" placeholder="Enter  City" required />
            </div>
            <div class="input-box">
              <label>Country</label>
              <select name="country" id="country" class="sa" required>
                <option value="select">Select</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Åland Islands">Åland Islands</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Bouvet Island">Bouvet Island</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote D'ivoire">Cote D'ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Territories">French Southern Territories</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guernsey">Guernsey</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-bissau">Guinea-bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jersey">Jersey</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                <option value="Korea, Republic of">Korea, Republic of</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macao">Macao</option>
                <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                <option value="Moldova, Republic of">Moldova, Republic of</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Netherlands Antilles">Netherlands Antilles</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn">Pitcairn</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russian Federation">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Helena">Saint Helena</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-leste">Timor-leste</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Viet Nam">Viet Nam</option>
                <option value="Virgin Islands, British">Virgin Islands, British</option>
                <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                <option value="Wallis and Futuna">Wallis and Futuna</option>
                <option value="Western Sahara">Western Sahara</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
            </div>
          </div>
          <div class="column">
            <div class="input-box">
              <label>Postal/Zip code</label>
              <input type="text" name="code" id="code" style="width: 90%;" placeholder="Enter  Postal/Zip code" required />
            </div>
            <style>
              .sel {
                position: relative;
                top: 27px;
                width: 100%;
                height: 48%;
                border: 1px solid rgb(214, 211, 206);
                border-radius: 5px;
              }

              .label {
                position: relative;
                top: 22px;
              }
            </style>
            <div class="input-box">
              <label for="state">State</label>
              <div id="state-container">
                <input type="text" name="state" id="state" placeholder="Enter State" required />
              </div>
            </div>
            <div class="form-group" style="float: right;">
              <label class="lable"> Photo </label>
              <div style="border: 1px solid black; height: 150px; width: 150px;  background: #F5FAFF;">
                <img id="output" width="150" height="150" / style="display:none">
              </div>
              <div clas="file_input_wrap">
                <input type="file" name="image" id="image" onchange="loadFile(event)" class=" hide" required accept="image/*" / style="width:150px;" required />
                <label for="image" class="btn btn-large">Select image</label>
              </div>
              <div class="img_preview_wrap">
                <img src="" id="imagePreview" alt="Preview Image" width="200px" class="hide" />
              </div>
              <script>
                const states = [
                  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
                  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
                  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
                  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
                  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
                  "Uttar Pradesh", "Uttarakhand", "West Bengal"
                ];
                document.getElementById("country").addEventListener("change", function() {
                  let stateContainer = document.getElementById("state-container");
                  if (this.value === "India") {
                    // Create a select element
                    let select = document.createElement("select");
                    select.name = "state";
                    select.id = "state";
                    select.className = "form-control";
                    select.required = true;
                    // Add default option
                    let defaultOption = document.createElement("option");
                    defaultOption.value = "";
                    defaultOption.textContent = "Select State";
                    select.appendChild(defaultOption);
                    // Populate states for India
                    states.forEach(state => {
                      let option = document.createElement("option");
                      option.value = state;
                      option.textContent = state;
                      select.appendChild(option);
                    });
                    stateContainer.innerHTML = "";
                    stateContainer.appendChild(select);
                  } else {
                    // Create a text input field
                    let input = document.createElement("input");
                    input.type = "text";
                    input.name = "state";
                    input.id = "state";
                    input.className = "form-control";
                    input.placeholder = "Enter State";
                    input.required = true;
                    stateContainer.innerHTML = "";
                    stateContainer.appendChild(input);
                  }
                });
              </script>
              <script>
                $('#imageUpload').change(function() {
                  readImgUrlAndPreview(this);

                  function readImgUrlAndPreview(input) {
                    if (input.files && input.files[0]) {
                      var reader = new FileReader();
                      reader.onload = function(e) {
                        $('#imagePreview').removeClass('hide').attr('src', e.target.result);
                      }
                    };
                    reader.readAsDataURL(input.files[0]);
                  }
                });
              </script>
              
              <script>
                var loadFile = function(event) {
                  var reader = new FileReader();
                  reader.onload = function() {
                    var output = document.getElementById('output');
                    output.src = reader.result;
                  };
                  $('#output').show();
                  reader.readAsDataURL(event.target.files[0]);
                };
              </script>
            </div>
          </div>
          <div class="mt-3">
            <button class="button btn-navigate-form-step" onclick="validateForm()" type="button" step_number="2">Next</button>
          </div>
        </section>
        <style>
          .sa4 {
            width: 100%;
            height: 50px;
            border: 1px solid rgb(214, 211, 206);
            border-radius: 5px;
          }
        </style>
        <section id="step-2" class="form-step d-none">
          <h1 class="font-normal" style="font-size:25px">BE A PART OF INDIAN COMMERCE ASSOCIATION<br> PAY NOW</h1><br>
          <select name="plan" id="plan" class="sa4" required>
            <option value="select">Select</option>
            <option value="1" data-amount="521000">Life Member-Individual Fee (5210 Rs)</option>
            <option value="2" data-amount="2604000">Life Member-Institutional Fee (26040 Rs)</option>
            <option value="3" data-amount="20826000">Patron Member Fee (208260 Rs)</option>
          </select>
          
          <div class="mt-3">
            <button class="button submit-btn" id="payButton" name="form_submit">Save</button>
          </div>
        </section>
        </section>
      </form>
    </div>
  </div>
  <script>
    
    function validateForm() {
      // Clear previous error messages
      $('#errorMessages').empty();
      // Get values from the form fields
      const selectedTitle = $('#title').find(':selected').val();
      const fname = $('#fname').val();
      const lname = $('#lname').val();
      const gender = $('#gender').val();
      const email = $('#email').val();
      const phone = $('#phone').val();
      const address1 = $('#address1').val();
      const selecteddesignation = $('#designation').find(':selected').val();
      const department = $('#department').val();
      const college = $('#college').val();
      const email1 = $('#email1').val();
      const address = $('#address').val();
      const city = $('#city').val();
      // const state = $('#state').val();
      const code = $('#code').val();
      const state = $('#state').find(':selected').val();
      const country = $('#country').val();
      const selectedcountry = $('#country').find(':selected').val();
      const image = $('#image').val(); // For simplicity, we just check if the file input is not empty
      // Initialize an array to store error messages
      let errors = [];
      // Validation logic
      if (selectedTitle === "select" || !selectedTitle) {
        errors.push('Title is required.');
      } else if (!fname || !/^[a-zA-Z]+$/.test(fname)) {
        errors.push('First Name is required and must contain only letters.');
      } else if (!lname || !/^[a-zA-Z]+$/.test(lname)) {
        errors.push('Last Name is required and must contain only letters.');
      } else {
        const validGenders = ['Male', 'Female', 'Other'];
        if (!gender || !validGenders.includes(gender)) {
          errors.push('Gender is required and must be one of the following: Male, Female, Other.');
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!email || !emailRegex.test(email)) {
            errors.push('A valid Email is required.');
          } else {
            const phoneRegex = /^\+?[1-9]\d{1,14}$/;
            if (!phone || !phoneRegex.test(phone)) {
              errors.push('A valid Phone number is required.');
            } else if (!address1) {
              errors.push('Address1 is required.');
            } else if (selecteddesignation === "select" || !selecteddesignation) {
              errors.push('Designation is required.');
            } else if (!department) {
              errors.push('Department is required.');
            } else if (!college) {
              errors.push('College is required.');
            } else if (!email1 || !emailRegex.test(email1)) {
              errors.push('A valid Email1 is required.');
            } else if (!address) {
              errors.push('Address is required.');
            } else if (!city || !/^[a-zA-Z]+$/.test(city)) {
              errors.push('City is required and must contain only letters.');
            } else {
              const codeRegex = /^\d{6}(-\d{4})?$/;
              if (!code || !codeRegex.test(code)) {
                errors.push('A valid Code (ZIP/Postal) is required.');
              } else if (selectedcountry === "select" || !selectedcountry) {
                errors.push('Country is required.');
              } else if (!image) {
                errors.push('Image is required.');
              }
            }
          }
        }
      }
      // Display errors if any
      if (errors.length > 0) {
        Swal.fire({
          title: 'Error!',
          text: errors.join(' '), // Join multiple errors with space
          icon: 'error',
          confirmButtonText: 'OK'
        });
        // errors.forEach(error => $('#errorMessages').append(`<p>${error}</p>`));
        //  return false; // Prevent form submission
      } else {
        var formData = new FormData($('#userAccountSetupForm')[0]);
        // Submit the form after payment is successful
        $.ajax({
          url: 'find_user.php',
          type: 'POST',
          data: formData,
          processData: false, // Prevent jQuery from automatically transforming the data into a query string
          contentType: false, // Prevent jQuery from setting content type
          success: function(data) {
            var response = JSON.parse(data);
            if (response.redirect) {
              window.location.href = response.redirect;
            } else {
              const navigateToFormStep = stepNumber => {
                // Hide all form steps
                document.querySelectorAll(".form-step").forEach(formStepElement => formStepElement.classList.add("d-none"));
                // Mark all form steps as unfinished
                document.querySelectorAll(".form-stepper-list").forEach(formStepHeader => {
                  formStepHeader.classList.add("form-stepper-unfinished");
                  formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed");
                });
                // Show the current form step
                document.querySelector("#step-" + stepNumber).classList.remove("d-none");
                // Mark the current form step as active
                const formStepCircle = document.querySelector('li[step="' + stepNumber + '"]');
                formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-completed");
                formStepCircle.classList.add("form-stepper-active");
                // Mark all previous steps as completed
                for (let index = 0; index < stepNumber; index++) {
                  const formStepCircle = document.querySelector('li[step="' + index + '"]');
                  if (formStepCircle) {
                    formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
                    formStepCircle.classList.add("form-stepper-completed");
                  }
                }
              };
              // Event listeners for form navigation buttons
              const desiredStep = 2; // Replace with the step number you want to navigate to
              navigateToFormStep(desiredStep);
            }
          },
          error: function() {}
        });
        $('#errorMessages').append('<p>Form is valid and ready for submission.</p>');
        return true; // Allow form submission
      }
    }
  </script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const navigateButtons = document.querySelectorAll('.btn-navigate-form-step');
      navigateButtons.forEach(button => {
        button.addEventListener('click', function() {
          const stepNumber = this.getAttribute('step_number');
          const currentStep = this.closest('.form-step');
          const inputs = currentStep.querySelectorAll('input, textarea, select');
          let allValid = true;
          inputs.forEach(input => {
            if (!input.checkValidity()) {
              allValid = false;
              input.reportValidity();
            }
          });
          if (allValid) {
            navigateToStep(stepNumber);
          }
        });
      });

      function navigateToStep(stepNumber) {
        document.querySelectorAll('.form-step').forEach(step => {
          step.classList.remove('active');
        });
        document.querySelector('.form-step[data-step="' + stepNumber + '"]').classList.add('active');
      }
    });
  </script>
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  <script>
    $(document).ready(function() {
      $('#payButton').click(function(event) {
        event.preventDefault(); // Prevent the default form submission
        var selectedOption = $('#plan').find(':selected');
        var amount = selectedOption.data('amount'); // Get amount data attribute
        var planId = selectedOption.val();
        var name = $('#fname').val() + ' ' + $('#lname').val(); // Full name
        var email = $('#email').val();
        var phone = $('#phone').val();

        if (planId !== "select" && amount) {
          // Step 1: Create an order and get Razorpay credentials
          $.ajax({
            url: 'payment.php',
            type: 'POST',
            data: {
              amount: amount,
              plan_id: planId,
              name: name,
              email: email,
              phone: phone
            },
            dataType: 'json',
            success: function(response) {
              if (response.error) {
                alert(response.error);
              } else {
                makePayment(response.amount, response.order_id, response.key, name, email, phone);
              }
            },
            error: function() {
              alert("Error in creating order. Please try again.");
            }
          });
        } else {
          alert("Please select a valid plan.");
        }
      });

      function makePayment(amount, orderId, keyId, name, email, phone) {
        var options = {
          key: keyId, // Razorpay key ID fetched from server
          amount: amount, // Amount in paise
          currency: "INR",
          name: "Acme Corp",
          description: "Test Transaction",
          order_id: orderId, // Order ID generated by Razorpay
          handler: function(response) {
            var formData = new FormData($('#userAccountSetupForm')[0]);
            formData.append('razorpay_payment_id', response.razorpay_payment_id);
            formData.append('razorpay_order_id', response.razorpay_order_id);
            formData.append('razorpay_signature', response.razorpay_signature);
            $.ajax({
              url: 'form_action.php',
              type: 'POST',
              data: formData,
              processData: false, // Prevent jQuery from automatically transforming the data into a query string
              contentType: false, // Prevent jQuery from setting content type
              success: function(data) {              
                var response = JSON.parse(data);
                if (response.success) {
                  if (response.reg_no) {
                    window.location.href = 'preview.php?id=' + response.reg_no;
                  } else {
                    alert(response.message);
                  }
                } else {
                  if (response.redirect) {
                    window.location.href = response.redirect;
                  } else {
                    alert(response.message);
                  }
                }
              },
              error: function() {
                alert("Error in verifying payment. Please contact support.");
              }
            });
            $.ajax({
              url: 'payment_success.php',
              type: 'POST',
              data: {
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                amount: amount,
                name: name,
                email: email,
                phone: phone
              },
              dataType: 'json',
              success: function(response) {
                if (response.success) {
                  alert("Payment successful and email sent.");
                  window.location.href = "/";

                } else {
                  alert("Payment successful, but there was an error sending the email: " + response.error);
                }
              },
              error: function() {
                alert("Error in notifying the server. Please try again.");
              }
            });
          },
          prefill: {
            name: name,
            email: email,
            contact: phone
          },
          theme: {
            color: "#3399cc"
          }
        };
        var rzp = new Razorpay(options);
        rzp.open();
      }
    });
  </script>
</body>

</html> */