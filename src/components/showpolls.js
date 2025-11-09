import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommunityPolls } from "../redux/sclassRelated/sclassHandle";
import { updatePoll } from "../redux/sclassRelated/sclassHandle";
import {
  Box,
  Typography,
  Paper,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

const pollStyles = `
/* POLL STYLES - full page layout with reduced sizes */
.pollsOuterContainer { 
  display:flex; 
  justify-content:center; 
  align-items:flex-start; 
  padding:2.5rem 2rem; 
  min-height:100vh; 
  background:linear-gradient(135deg, #f5f7fa 0%, #e8f0fb 100%);
  box-sizing:border-box;
}

.pollsContainer { 
  padding:2.5rem 3rem; 
  max-width:1200px; 
  width:100%; 
  font-family:Inter, Roboto, "Helvetica Neue", Arial, sans-serif; 
  background:#fff;
  border-radius:18px;
  box-shadow:0 10px 40px rgba(6,10,30,0.08);
  border:1px solid rgba(12,18,30,0.06);
}

.pollsTitle { font-size:2rem; font-weight:700; color:#071a2b; margin-bottom:2rem; text-align:center; }

.pollPaper { 
  border-radius:14px; 
  box-shadow:0 6px 16px rgba(6,10,30,0.04); 
  overflow:hidden; 
  border:1px solid rgba(12,18,30,0.04); 
  background:#fff; 
  margin-bottom:1.5rem; 
  transition:box-shadow .2s ease, transform .2s ease; 
}
.pollPaper:hover { 
  box-shadow:0 10px 28px rgba(6,10,30,0.08); 
  transform:translateY(-2px);
}

/* POLL CARD - with side accent */
.pollCard { padding:22px 26px; border-radius:14px; background:#fafbfd; border:1px solid rgba(10,20,40,0.04); position:relative; overflow:hidden; }
.pollCard::before { content:''; position:absolute; left:0; top:0; bottom:0; width:5px; }

.pollCard.variant0::before { background:linear-gradient(180deg,#0a78ff,#07b389); }
.pollCard.variant1::before { background:linear-gradient(180deg,#d45bff,#7a5cff); }
.pollCard.variant2::before { background:linear-gradient(180deg,#ff8b4b,#ff5c80); }
.pollCard.variant3::before { background:linear-gradient(180deg,#21b6a8,#0a78ff); }

.pollHeader { display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; padding-left:14px; }
.pollQuestion { font-weight:700; color:#0b2440; font-size:1.15rem; line-height:1.4; flex:1; margin:0; }
.pollStatus { font-size:0.88rem; color:#6b7685; padding:6px 14px; border-radius:20px; background:rgba(80,96,122,0.08); white-space:nowrap; font-weight:600; }

/* OPTIONS ROW - option|graph|percentage (NO SPACE) then votes far right */
.pollOptionRow { display:flex; align-items:center; padding:12px 0 12px 14px; border-bottom:1px solid rgba(10,20,40,0.04); justify-content:space-between; }
.pollOptionRow:last-child { border-bottom:none; }

/* LEFT GROUP: option + bar + percentage (tightly packed, NO gaps) */
.optionLeftGroup { display:flex; align-items:center; gap:0; flex:1; max-width:75%; }

/* 1. OPTION label */
.optionLabel { flex:0 0 170px; font-size:0.98rem; color:#2c3e50; font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding-right:14px; }

/* 2. BAR - right next to option */
.optionBarWrap { flex:1; min-width:240px; display:flex; align-items:center; }
.optionBar { height:12px; background:#e8f0fb; border-radius:8px; overflow:hidden; width:100%; }
.optionFill { height:100%; border-radius:8px; transition:width .6s cubic-bezier(0.4,0,0.2,1); }

.pollCard.variant0 .optionFill { background:linear-gradient(90deg,#0a78ff,#07b389); }
.pollCard.variant1 .optionFill { background:linear-gradient(90deg,#d45bff,#7a5cff); }
.pollCard.variant2 .optionFill { background:linear-gradient(90deg,#ff8b4b,#ff5c80); }
.pollCard.variant3 .optionFill { background:linear-gradient(90deg,#21b6a8,#0a78ff); }

/* 3. PERCENTAGE - immediately next to bar, NO space */
.optionPercent { flex:0 0 58px; font-weight:700; color:#0b2440; font-size:0.96rem; padding-left:10px; text-align:left; }

/* 4. VOTES - far right with large space */
.optionVotes { flex:0 0 auto; font-weight:600; color:#5a6c7d; font-size:0.92rem; padding-left:28px; text-align:right; white-space:nowrap; }

/* VOTING SECTION */
.votingSection { padding:16px 14px; }
.radioGroup { display:flex; flex-direction:column; gap:10px; margin-bottom:16px; }
.radioOption { margin:0; padding:10px 14px; border-radius:10px; transition:background .12s ease; }
.radioOption:hover { background:rgba(10,120,255,0.04); }

.voteButton { 
  display:inline-flex; 
  align-items:center; 
  justify-content:center; 
  padding:12px 26px; 
  border-radius:11px; 
  background:linear-gradient(90deg,#0a78ff 0%,#0556d6 100%); 
  color:#fff; 
  font-weight:700; 
  border:none; 
  cursor:pointer; 
  transition:transform .08s ease, box-shadow .12s ease; 
  box-shadow:0 7px 20px rgba(5,86,214,0.14); 
  font-size:0.98rem; 
  margin-top:10px; 
}
.voteButton:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 32px rgba(5,86,214,0.18); }
.voteButton:disabled { opacity:0.5; cursor:not-allowed; }

.noPolls { text-align:center; padding:4rem; color:#6b7685; font-size:1.15rem; }

/* responsive */
@media (max-width:1200px) {
  .pollsContainer { padding:2rem 2.5rem; max-width:100%; }
  .optionLeftGroup { max-width:70%; }
  .optionLabel { flex-basis:150px; }
  .optionBarWrap { min-width:200px; }
}

@media (max-width:900px) {
  .pollsOuterContainer { padding:1.5rem 1rem; }
  .pollsContainer { padding:1.75rem 2rem; }
  .pollsTitle { font-size:1.75rem; }
  .pollQuestion { font-size:1.05rem; }
  .optionLabel { flex-basis:140px; font-size:0.95rem; }
  .optionBarWrap { min-width:180px; }
  .optionPercent { font-size:0.92rem; }
  .optionVotes { font-size:0.88rem; }
}

@media (max-width:720px) {
  .pollsOuterContainer { padding:1rem; }
  .pollsContainer { padding:1.5rem; }
  .pollsTitle { font-size:1.5rem; }
  .pollCard { padding:16px 18px; }
  .optionLeftGroup { max-width:65%; }
  .optionLabel { flex-basis:120px; font-size:0.9rem; }
  .optionBarWrap { min-width:150px; }
  .optionPercent { flex-basis:50px; font-size:0.88rem; }
  .optionVotes { font-size:0.85rem; padding-left:18px; }
}
`;

const Showpolls = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { pollsList } = useSelector((state) => state.sclass);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    // Inject styles
    const styleEl = document.createElement("style");
    styleEl.textContent = pollStyles;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  useEffect(() => {
    if (currentUser?._id && currentUser?.sclassName?._id) {
      dispatch(
        getAllCommunityPolls(currentUser._id, currentUser.sclassName._id, "Polls")
      );
    }
  }, [dispatch, currentUser]);

  const handleOptionChange = (pollId, index) => {
    setSelectedOptions((prev) => ({ ...prev, [pollId]: index }));
  };

  const handleVoteSubmit = (pollID) => {
    const selectedIndex = selectedOptions[pollID];
    const fields = {
      pollID,
      userID: currentUser._id,
      option: selectedIndex,
    };
    if (typeof selectedIndex !== "undefined") {
      dispatch(updatePoll(fields, "Pollvote"));
      window.location.reload();
    }
  };

  return (
    <div className="pollsOuterContainer">
      <div className="pollsContainer">
        <h1 className="pollsTitle">Community Polls</h1>

        {pollsList?.length > 0 ? (
          pollsList.map((poll, pIndex) => {
            const variant = pIndex % 4;
            const total = (poll.votes || []).reduce((a, b) => a + (b || 0), 0);

            return (
              <Paper key={poll._id} className="pollPaper" elevation={0}>
                <div className={`pollCard variant${variant}`}>
                  <div className="pollHeader">
                    <h3 className="pollQuestion">{poll.question}</h3>
                    <span className="pollStatus">
                      {poll.isVoted ? "Voted" : "Vote Now"}
                    </span>
                  </div>

                  {poll.isVoted ? (
                    // ✅ Show poll results with graph
                    <div>
                      {poll.options.map((opt, idx) => {
                        const v = (poll.votes && poll.votes[idx]) ? poll.votes[idx] : 0;
                        const pct = total ? Math.round((v / total) * 100) : 0;
                        return (
                          <div key={idx} className="pollOptionRow">
                            <div className="optionLeftGroup">
                              <div className="optionLabel">{opt}</div>
                              <div className="optionBarWrap">
                                <div className="optionBar">
                                  <div className="optionFill" style={{ width: `${pct}%` }} />
                                </div>
                              </div>
                              <div className="optionPercent">{pct}%</div>
                            </div>
                            <div className="optionVotes">{v} votes</div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // ❌ Not voted, show voting options
                    <div className="votingSection">
                      <RadioGroup
                        className="radioGroup"
                        value={selectedOptions[poll._id] ?? ""}
                        onChange={(e) =>
                          handleOptionChange(poll._id, parseInt(e.target.value))
                        }
                      >
                        {poll.options.map((opt, index) => (
                          <FormControlLabel
                            key={index}
                            value={index}
                            control={<Radio />}
                            label={opt}
                            className="radioOption"
                          />
                        ))}
                      </RadioGroup>
                      <button
                        className="voteButton"
                        onClick={() => handleVoteSubmit(poll._id)}
                        disabled={typeof selectedOptions[poll._id] === "undefined"}
                      >
                        Submit Vote
                      </button>
                    </div>
                  )}
                </div>
              </Paper>
            );
          })
        ) : (
          <div className="noPolls">No polls available.</div>
        )}
      </div>
    </div>
  );
};

export default Showpolls;
