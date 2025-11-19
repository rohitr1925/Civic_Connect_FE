import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Divider,
  Tooltip,
  InputAdornment,
  LinearProgress,
  Paper,
  Fade,
  Zoom
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import { BlueButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import styled from "styled-components";
import GroupsIcon from "@mui/icons-material/Groups";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const AddClass = () => {
  const [sclassName, setSclassName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [touched, setTouched] = useState({});
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, currentUser, response, error, tempDetails } = useSelector((s) => s.user);
  const adminID = currentUser?._id;
  const address = "Sclass";

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const fields = { sclassName, adminID, name, email, password };

  // Validation helpers
  const emailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email]
  );
  const pwdStrength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const strengthLabel = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Excellent",
  ][pwdStrength];

  const canSubmit =
    sclassName.trim().length > 2 &&
    name.trim().length > 1 &&
    emailValid &&
    pwdStrength >= 3 &&
    !loader &&
    adminID;

  const markTouched = (field) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const submitHandler = (e) => {
    e.preventDefault();
    if (!adminID) {
      setMessage("Missing admin ID");
      setShowPopup(true);
      return;
    }
    if (!canSubmit) {
      setMessage("Please fix validation errors first.");
      setShowPopup(true);
      return;
    }
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      :root{
        --bg-soft:#f3f6fa;
        --panel-bg:#ffffff;
        --border:#dfe5ec;
        --text-dark:#13293b;
        --text-mid:#536678;
        --text-light:#8a96a3;
        --primary:#0a78ff;
        --accent:#07b389;
        --danger:#c53030;
        --warning:#f59e0b;
        --radius-lg:24px;
        --shadow-sm:0 2px 6px rgba(30,45,60,0.08);
        --shadow-md:0 6px 18px -6px rgba(25,40,60,0.12);
        --shadow-focus:0 0 0 3px rgba(10,120,255,0.25);
      }
      .pageWrap {
        background: radial-gradient(circle at 25% 20%, #f0f7ff 0%, #f3f6fa 40%) fixed;
        min-height:100vh;
        padding:clamp(1rem,2.5vw,2rem);
        display:flex;
        align-items:flex-start;
        justify-content:center;
      }
      .panelCard {
        width:100%;
        max-width:1040px;
        background:var(--panel-bg);
        border:1px solid var(--border);
        border-radius:var(--radius-lg);
        box-shadow:var(--shadow-md);
        overflow:hidden;
        display:flex;
        flex-direction:column;
        animation: slideUp 0.4s ease-out;
      }
      @keyframes slideUp {
        from { opacity:0; transform:translateY(20px); }
        to { opacity:1; transform:translateY(0); }
      }
      .panelHeader {
        display:flex;
        align-items:center;
        gap:1rem;
        padding:1.4rem 1.6rem;
        background:linear-gradient(135deg,#f8fbff 0%, #e9f3ff 100%);
        border-bottom:1px solid var(--border);
      }
      .headerIcon {
        width:62px;height:62px;border-radius:18px;
        display:flex;align-items:center;justify-content:center;
        background:linear-gradient(135deg,var(--primary),var(--accent));
        color:#fff; box-shadow:0 10px 28px -10px rgba(10,120,255,.35);
        transition: transform .2s ease;
      }
      .headerIcon:hover { transform: scale(1.05); }
      .title {
        margin:0; color:var(--text-dark); letter-spacing:-.4px;
        font-weight:800; font-size:1.55rem;
      }
      .subtitle {
        margin:.15rem 0 0;
        color:var(--text-mid); font-size:.75rem;
        text-transform:uppercase; letter-spacing:.75px; font-weight:700;
      }
      .panelBody { padding:1.6rem 1.6rem 2rem; }
      .sectionTitle {
        margin:0 0 .7rem; color:var(--text-mid); font-size:.78rem;
        text-transform:uppercase; letter-spacing:.9px; font-weight:700;
        display:flex; align-items:center; gap:.4rem;
      }
      .footerBar {
        display:flex; align-items:center; justify-content:space-between; gap:1rem;
        margin-top:1.4rem; padding-top:1.2rem; border-top:1px dashed var(--border);
        flex-wrap:wrap;
      }
      .muted { color:var(--text-mid); }
      .previewCard {
        margin-top:1.4rem;
        border:1px solid var(--border);
        border-radius:18px;
        background:linear-gradient(135deg, #fbfdff 0%, #f5faff 100%);
        padding:1.2rem 1.4rem;
        box-shadow:var(--shadow-sm);
        transition: box-shadow .2s ease;
      }
      .previewCard:hover { box-shadow:var(--shadow-md); }
      .previewTitle {
        margin:0 0 .6rem;
        font-size:.75rem;
        text-transform:uppercase;
        letter-spacing:.8px;
        font-weight:700;
        color:var(--text-mid);
        display:flex;
        align-items:center;
        gap:.4rem;
      }
      .badgeGood {
        display:inline-block;
        padding:.3rem .7rem;
        font-size:.65rem;
        font-weight:700;
        letter-spacing:.7px;
        background:#e6f8f3;
        color:#067a5f;
        border-radius:10px;
        margin-left:.4rem;
        animation: pulse 1.5s ease-in-out infinite;
      }
      @keyframes pulse {
        0%, 100% { transform:scale(1); }
        50% { transform:scale(1.05); }
      }
      .strengthWrap {
        margin-top:.45rem;
        display:flex;
        align-items:center;
        gap:.55rem;
      }
      .strengthLabel {
        font-size:.65rem;
        font-weight:700;
        text-transform:uppercase;
        letter-spacing:.7px;
        color:var(--text-mid);
        min-width:72px;
      }
      .inlineError {
        display:flex;
        align-items:center;
        gap:.35rem;
        font-size:.68rem;
        font-weight:600;
        letter-spacing:.5px;
        color:var(--danger);
        margin-top:.4rem;
        animation: fadeIn .3s ease;
      }
      .inlineSuccess {
        display:flex;
        align-items:center;
        gap:.35rem;
        font-size:.68rem;
        font-weight:600;
        letter-spacing:.5px;
        color:var(--accent);
        margin-top:.4rem;
        animation: fadeIn .3s ease;
      }
      @keyframes fadeIn {
        from { opacity:0; }
        to { opacity:1; }
      }
      .infoBox {
        display:flex;
        align-items:flex-start;
        gap:.6rem;
        padding:.8rem 1rem;
        border-radius:14px;
        background:#f0f7ff;
        border:1px solid #d4e7ff;
        margin-top:.8rem;
      }
      .infoBox svg { color:var(--primary); flex-shrink:0; }
      .infoBox p { margin:0; font-size:.7rem; color:var(--text-mid); line-height:1.5; }
      @media (max-width:760px){
        .panelHeader { flex-wrap:wrap; }
        .footerBar { flex-direction:column; align-items:flex-start; }
        .title { font-size:1.35rem; }
        .panelBody { padding:1.2rem 1.2rem 1.6rem; }
        .headerIcon { width:56px; height:56px; }
      }
    `;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  useEffect(() => {
    if (status === "added" && tempDetails) {
      navigate("/Admin/communities/community/" + tempDetails._id);
      dispatch(underControl());
      setLoader(false);
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch, tempDetails]);

  return (
    <>
      <Box className="pageWrap">
        <Fade in timeout={400}>
          <Box className="panelCard">
            <Box className="panelHeader">
              <Box className="headerIcon">
                <GroupsIcon style={{ fontSize: "1.9rem" }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography className="title">Create Community</Typography>
                <Typography className="subtitle">
                  Community and Leader Setup
                </Typography>
              </Box>
              <Tooltip title="Go Back" arrow>
                <Button
                  variant="text"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate(-1)}
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': { background: '#f0f7ff' }
                  }}
                >
                  Back
                </Button>
              </Tooltip>
            </Box>

            <Box className="panelBody">
              <form onSubmit={submitHandler} noValidate>
                <Typography className="sectionTitle">
                  <GroupsIcon style={{ fontSize: '1rem' }} />
                  Community details
                </Typography>
                <Grid container spacing={1.3} sx={{ mb: 1 }}>
                  <Grid item xs={12}>
                    <TextField
                      label="Community Name"
                      placeholder="e.g., Riverdale Neighborhood"
                      fullWidth
                      value={sclassName}
                      onChange={(e) => setSclassName(e.target.value)}
                      onBlur={() => markTouched("sclassName")}
                      required
                      sx={styles.inputField}
                      error={touched.sclassName && sclassName.trim().length < 3}
                      helperText={
                        touched.sclassName && sclassName.trim().length < 3
                          ? "Minimum 3 characters required."
                          : "Enter a descriptive, recognizable name for your community."
                      }
                      FormHelperTextProps={{
                        sx: {
                          fontSize: ".68rem",
                          fontWeight: 600,
                          letterSpacing: ".3px",
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2.2 }} />

                <Typography className="sectionTitle">
                  <AdminPanelSettingsIcon style={{ fontSize: '1rem' }} />
                  Leader details
                </Typography>
                <Grid container spacing={1.3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Leader Name"
                      placeholder="e.g., Alex Johnson"
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => markTouched("name")}
                      autoComplete="name"
                      required
                      sx={styles.inputField}
                      error={touched.name && name.trim().length < 2}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AdminPanelSettingsIcon
                              style={{ color: "#0a78ff", fontSize: "1.2rem" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      helperText={
                        touched.name && name.trim().length < 2
                          ? "Name is too short."
                          : "Full name of the community leader."
                      }
                      FormHelperTextProps={{
                        sx: {
                          fontSize: ".68rem",
                          fontWeight: 600,
                          letterSpacing: ".3px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Leader Email"
                      placeholder="e.g., alex@example.com"
                      type="email"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => markTouched("email")}
                      autoComplete="email"
                      required
                      sx={styles.inputField}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon
                              style={{ color: "#0a78ff", fontSize: "1.1rem" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      error={touched.email && !emailValid}
                      helperText={
                        touched.email && !emailValid
                          ? "Please enter a valid email format."
                          : "Official email for sign-in & notifications."
                      }
                      FormHelperTextProps={{
                        sx: {
                          fontSize: ".68rem",
                          fontWeight: 600,
                          letterSpacing: ".3px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Leader Password"
                      placeholder="Create a secure password"
                      type="password"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => markTouched("password")}
                      autoComplete="new-password"
                      required
                      sx={styles.inputField}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon
                              style={{ color: "#0a78ff", fontSize: "1.1rem" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      helperText="Use 8+ chars including uppercase, number & symbol."
                      FormHelperTextProps={{
                        sx: {
                          fontSize: ".68rem",
                          fontWeight: 600,
                          letterSpacing: ".3px",
                        },
                      }}
                    />
                    <Box className="strengthWrap">
                      <span className="strengthLabel">Strength</span>
                      <Box sx={{ flex: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={(pwdStrength / 5) * 100}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            background: "#e4ecf3",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor:
                                pwdStrength >= 4
                                  ? "#07b389"
                                  : pwdStrength >= 3
                                  ? "#0a78ff"
                                  : "#c53030",
                              transition: "all 0.3s ease",
                            },
                          }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontSize: ".68rem",
                          fontWeight: 700,
                          color:
                            pwdStrength >= 4
                              ? "#07b389"
                              : pwdStrength >= 3
                              ? "#0a78ff"
                              : "#c53030",
                          minWidth: 72,
                          textAlign: "right",
                        }}
                      >
                        {strengthLabel}
                      </Typography>
                    </Box>
                    {touched.password && pwdStrength < 3 && (
                      <div className="inlineError">
                        <ErrorOutlineIcon fontSize="inherit" />
                        Password is too weak
                      </div>
                    )}
                    {touched.password && pwdStrength >= 4 && (
                      <div className="inlineSuccess">
                        <CheckCircleIcon fontSize="inherit" />
                        Strong password!
                      </div>
                    )}
                  </Grid>
                </Grid>

                {/* Info Box */}
                <Box className="infoBox">
                  <InfoOutlinedIcon style={{ fontSize: '1.1rem' }} />
                  <p>
                    <strong>Security tip:</strong> Use a unique password that combines uppercase, lowercase, numbers and special characters. Avoid using common words or personal information.
                  </p>
                </Box>

                {/* Live Preview */}
                <Zoom in timeout={300}>
                  <Paper elevation={0} className="previewCard">
                    <p className="previewTitle">
                      <CheckCircleIcon style={{ fontSize: '.9rem' }} />
                      Live Preview
                    </p>
                    <Typography
                      variant="subtitle1"
                      sx={{ 
                        fontWeight: 700, 
                        display: "flex", 
                        alignItems: "center", 
                        gap: ".4rem",
                        color: 'var(--text-dark)',
                        fontSize: '1.05rem'
                      }}
                    >
                      {sclassName || "Community Name Pending"}
                      {sclassName.trim().length >= 3 && (
                        <span className="badgeGood">✓ Ready</span>
                      )}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "var(--text-mid)", mt: .5 }}>
                      Leader: {name || "—"} {email && <>• {email}</>}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ display: "block", mt: .7, color: "var(--text-light)", fontWeight: 600 }}
                    >
                      Password strength: {strengthLabel}
                    </Typography>
                  </Paper>
                </Zoom>

                <Box className="footerBar">
                  <Typography variant="body2" className="muted">
                    <strong>Tip:</strong> You can also watch live preview here.
                  </Typography>
                  <Tooltip
                    title={
                      canSubmit
                        ? "Create community"
                        : "Please fill all required fields & ensure password strength is at least 'Good'"
                    }
                    arrow
                  >
                    <span>
                      <BlueButton
                        size="large"
                        variant="contained"
                        type="submit"
                        disabled={!canSubmit}
                        sx={{
                          px: 3.4,
                          py: 1.2,
                          fontWeight: 700,
                          letterSpacing: ".5px",
                          borderRadius: '12px',
                          boxShadow: canSubmit ? '0 8px 24px -8px rgba(10,120,255,.45)' : 'none',
                          '&:hover': {
                            boxShadow: canSubmit ? '0 12px 32px -10px rgba(10,120,255,.55)' : 'none',
                          }
                        }}
                      >
                        {loader ? (
                          <CircularProgress size={22} color="inherit" />
                        ) : (
                          "Create Community"
                        )}
                      </BlueButton>
                    </span>
                  </Tooltip>
                </Box>
              </form>
            </Box>
          </Box>
        </Fade>
      </Box>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddClass;

const StyledContainer = styled(Box)`
  display:flex;
  align-items:center;
  justify-content:center;
`;
const StyledBox = styled(Box)``;

const styles = {
  inputField: {
    "& .MuiInputBase-root": {
      borderRadius: "14px",
      background: "#fff",
      transition: "box-shadow .2s ease, border-color .2s ease, transform .2s ease",
    },
    "& .MuiInputLabel-root": {
      color: "#697785",
      fontWeight: 600,
      letterSpacing: ".3px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#dfe5ec",
      borderWidth: "1.5px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c7d2dc",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      transform: "translateY(-1px)",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0a78ff",
      borderWidth: "2px",
      boxShadow: "0 0 0 3px rgba(10,120,255,0.15)",
    },
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c53030",
    },
    "& .MuiInputBase-input": {
      fontSize: ".92rem",
      fontWeight: 500,
      letterSpacing: ".3px",
    },
  },
};