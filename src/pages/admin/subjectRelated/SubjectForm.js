import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Divider,
  Chip,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import Popup from "../../../components/Popup";

const SubjectForm = () => {
  // Helper to format Date for <input type="datetime-local">
  const toInputValue = (d) => {
    try {
      const date = d instanceof Date ? d : new Date(d);
      const pad = (n) => String(n).padStart(2, "0");
      const yyyy = date.getFullYear();
      const mm = pad(date.getMonth() + 1);
      const dd = pad(date.getDate());
      const hh = pad(date.getHours());
      const mi = pad(date.getMinutes());
      return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
    } catch {
      return "";
    }
  };

  const [subjects, setSubjects] = useState([
    { subName: "", subCode: "", startDate: toInputValue(new Date()), endDate: toInputValue(new Date()) },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { status, currentUser, response, error } = useSelector(
    (state) => state.user
  );

  const sclassName = params.id; // class id in route
  const adminID = currentUser?._id;
  const address = "Subject";

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  // Theming styles injection (keeps form consistent with app look)
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      :root {
        --bg-soft:#f3f6fa;
        --panel-bg:#ffffff;
        --border:#dfe5ec;
        --text-dark:#13293b;
        --text-mid:#536678;
        --primary:#0a78ff;
        --accent:#07b389;
        --radius-lg:18px;
        --shadow-sm:0 2px 6px rgba(30,45,60,0.08);
        --shadow-md:0 6px 18px -6px rgba(25,40,60,0.12);
      }
      .formPage {
        background:var(--bg-soft);
        min-height:calc(100vh - 0px);
        padding:1.2rem;
      }
      .panelCard {
        max-width:980px;
        margin:0 auto;
        background:var(--panel-bg);
        border:1px solid var(--border);
        border-radius:22px;
        box-shadow:var(--shadow-md);
        overflow:hidden;
      }
      .panelHeader {
        display:flex;
        align-items:center;
        gap:1rem;
        padding:1.2rem 1.4rem;
        background:linear-gradient(135deg,#f8fbff 0%, #eef5ff 100%);
        border-bottom:1px solid var(--border);
      }
      .panelHeaderIcon {
        width:52px;height:52px;border-radius:14px;
        display:flex;align-items:center;justify-content:center;
        background:linear-gradient(135deg,var(--primary),var(--accent));
        color:#fff; box-shadow:0 10px 28px -10px rgba(10,120,255,.35);
      }
      .panelHeaderTitle {
        margin:0; color:var(--text-dark); letter-spacing:-.3px;
        font-weight:800; font-size:1.3rem;
      }
      .panelBody { padding:1.3rem 1.4rem 1.6rem; }
      .eventCard {
        border:1px solid var(--border);
        border-radius:16px;
        padding:1rem;
        background:#fbfdff;
        box-shadow:var(--shadow-sm);
      }
      .eventCardHeader {
        display:flex; align-items:center; justify-content:space-between; gap:.6rem;
        margin-bottom:.6rem;
      }
      .eventBadge {
        background:#e8f2ff; color:var(--primary); font-weight:700;
        border-radius:10px;
      }
      .actionsRow {
        display:flex; gap:.6rem; justify-content:flex-end; flex-wrap:wrap;
      }
      .footerBar {
        display:flex; align-items:center; justify-content:space-between; gap:1rem;
        margin-top:1rem; padding-top:1rem; border-top:1px dashed var(--border);
        flex-wrap:wrap;
      }
      .muted { color:var(--text-mid); }
    `;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  const handleInputChange = (index, field) => (event) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = event.target.value;
    setSubjects(newSubjects);
  };

  const handleAddSubject = () => {
    setSubjects((prev) => [
      ...prev,
      {
        subName: "",
        subCode: "",
        startDate: toInputValue(new Date()),
        endDate: toInputValue(new Date()),
      },
    ]);
  };

  const handleRemoveSubject = (index) => () => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  const fields = {
    sclassName,
    subjects: subjects.map((subject) => ({
      subName: subject.subName,
      subCode: subject.subCode,
      startDate: new Date(subject.startDate).toISOString(),
      endDate: new Date(subject.endDate).toISOString(),
    })),
    adminID,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!adminID) {
      setMessage("Missing admin ID");
      setShowPopup(true);
      return;
    }
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added") {
      navigate("/Admin/events");
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
  }, [status, navigate, error, response, dispatch]);

  return (
    <form onSubmit={submitHandler}>
      <Box className="formPage">
        <Box className="panelCard">
          {/* Header */}
          <Box className="panelHeader">
            <Box className="panelHeaderIcon">
              <EventIcon style={{ fontSize: "1.3rem" }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography className="panelHeaderTitle">Add Events</Typography>
              <Typography variant="caption" className="muted">
                Create and schedule events for your community
              </Typography>
            </Box>
            <Button
              variant="text"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Box>

          {/* Body */}
          <Box className="panelBody">
            <Grid container spacing={1.4}>
              {subjects.map((subject, index) => (
                <Grid key={index} item xs={12}>
                  <Box className="eventCard">
                    <Box className="eventCardHeader">
                      <Chip className="eventBadge" label={`Event ${index + 1}`} size="small" />
                      <Box className="actionsRow">
                        {index === 0 ? (
                          <Button
                            onClick={handleAddSubject}
                            variant="outlined"
                            startIcon={<PostAddIcon />}
                          >
                            Add Another
                          </Button>
                        ) : (
                          <Button
                            onClick={handleRemoveSubject(index)}
                            color="error"
                            variant="outlined"
                            startIcon={<DeleteForeverIcon />}
                          >
                            Remove
                          </Button>
                        )}
                      </Box>
                    </Box>

                    <Grid container spacing={1.2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Event Name"
                          placeholder="e.g., Community Cleanup"
                          variant="outlined"
                          value={subject.subName}
                          onChange={handleInputChange(index, "subName")}
                          sx={styles.inputField}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Event Code"
                          placeholder="e.g., CC-2025"
                          variant="outlined"
                          value={subject.subCode}
                          onChange={handleInputChange(index, "subCode")}
                          sx={styles.inputField}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Start Time"
                          variant="outlined"
                          type="datetime-local"
                          value={subject.startDate}
                          onChange={handleInputChange(index, "startDate")}
                          sx={styles.inputField}
                          required
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="End Time"
                          variant="outlined"
                          type="datetime-local"
                          value={subject.endDate}
                          onChange={handleInputChange(index, "endDate")}
                          sx={styles.inputField}
                          required
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Footer actions */}
            <Box className="footerBar">
              <Typography variant="body2" className="muted">
                Tip: You can add multiple events before saving.
              </Typography>
              <Box className="actionsRow">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loader}
                  startIcon={!loader ? <PostAddIcon /> : null}
                >
                  {loader ? <CircularProgress size={20} color="inherit" /> : "Save Events"}
                </Button>
              </Box>
            </Box>

            <Popup
              message={message}
              setShowPopup={setShowPopup}
              showPopup={showPopup}
            />
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default SubjectForm;

const styles = {
  inputField: {
    "& .MuiInputBase-root": {
      borderRadius: "12px",
      background: "#fff",
    },
    "& .MuiInputLabel-root": {
      color: "#6f7b87",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#dfe5ec",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#cfd7e0",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0a78ff",
      boxShadow: "0 0 0 2px rgba(10,120,255,0.15)",
    },
  },
};
