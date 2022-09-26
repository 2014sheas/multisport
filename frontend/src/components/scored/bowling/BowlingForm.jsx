import {useState} from 'react';
import Spinner from '../../Spinner'
import axios from 'axios';

function BowlingForm({event, teams}) {

    let scoreData = event.scoreData;


    const [formData, setFormData] = useState({

        t1p1f1: scoreData.team1[0][0], t1p1f2: scoreData.team1[0][1], 
        t1p2f1: scoreData.team1[1][0], t1p2f2: scoreData.team1[1][1], 
        t1p3f1: scoreData.team1[2][0], t1p3f2: scoreData.team1[2][1], 
        t1p4f1: scoreData.team1[3][0], t1p4f2: scoreData.team1[3][1], 

        t2p1f1: scoreData.team2[0][0], t2p1f2: scoreData.team2[0][1], 
        t2p2f1: scoreData.team2[1][0], t2p2f2: scoreData.team2[1][1], 
        t2p3f1: scoreData.team2[2][0], t2p3f2: scoreData.team2[2][1], 
        t2p4f1: scoreData.team2[3][0], t2p4f2: scoreData.team2[3][1], 

        t3p1f1: scoreData.team3[0][0], t3p1f2: scoreData.team3[0][1], 
        t3p2f1: scoreData.team3[1][0], t3p2f2: scoreData.team3[1][1], 
        t3p3f1: scoreData.team3[2][0], t3p3f2: scoreData.team3[2][1], 
        t3p4f1: scoreData.team3[3][0], t3p4f2: scoreData.team3[3][1], 

        t4p1f1: scoreData.team4[0][0], t4p1f2: scoreData.team4[0][1], 
        t4p2f1: scoreData.team4[1][0], t4p2f2: scoreData.team4[1][1], 
        t4p3f1: scoreData.team4[2][0], t4p3f2: scoreData.team4[2][1], 
        t4p4f1: scoreData.team4[3][0], t4p4f2: scoreData.team4[3][1], 

        t5p1f1: scoreData.team5[0][0], t5p1f2: scoreData.team5[0][1], 
        t5p2f1: scoreData.team5[1][0], t5p2f2: scoreData.team5[1][1], 
        t5p3f1: scoreData.team5[2][0], t5p3f2: scoreData.team5[2][1], 
        t5p4f1: scoreData.team5[3][0], t5p4f2: scoreData.team5[3][1], 

        t6p1f1: scoreData.team6[0][0], t6p1f2: scoreData.team6[0][1], 
        t6p2f1: scoreData.team6[1][0], t6p2f2: scoreData.team6[1][1], 
        t6p3f1: scoreData.team6[2][0], t6p3f2: scoreData.team6[2][1], 
        t6p4f1: scoreData.team6[3][0], t6p4f2: scoreData.team6[3][1], 
    });

    const {
        t1p1f1, t1p1f2,
        t1p2f1, t1p2f2,
        t1p3f1, t1p3f2,
        t1p4f1, t1p4f2,

        t2p1f1, t2p1f2,
        t2p2f1, t2p2f2,
        t2p3f1, t2p3f2,
        t2p4f1, t2p4f2,

        t3p1f1, t3p1f2,
        t3p2f1, t3p2f2,
        t3p3f1, t3p3f2,
        t3p4f1, t3p4f2,

        t4p1f1, t4p1f2,
        t4p2f1, t4p2f2,
        t4p3f1, t4p3f2,
        t4p4f1, t4p4f2,

        t5p1f1, t5p1f2,
        t5p2f1, t5p2f2,
        t5p3f1, t5p3f2,
        t5p4f1, t5p4f2,

        t6p1f1, t6p1f2,
        t6p2f1, t6p2f2,
        t6p3f1, t6p3f2,
        t6p4f1, t6p4f2,
        
    } = formData;

    

    const onSubmit = (e) => {
        e.preventDefault();

        const newData = {
            team1: [[t1p1f1, t1p1f2], [t1p2f1, t1p2f2], [t1p3f1, t1p3f2], [t1p4f1, t1p4f2]],
            team2: [[t2p1f1, t2p1f2], [t2p2f1, t2p2f2], [t2p3f1, t2p3f2], [t2p4f1, t2p4f2]],
            team3: [[t3p1f1, t3p1f2], [t3p2f1, t3p2f2], [t3p3f1, t3p3f2], [t3p4f1, t3p4f2]],
            team4: [[t4p1f1, t4p1f2], [t4p2f1, t4p2f2], [t4p3f1, t4p3f2], [t4p4f1, t4p4f2]],
            team5: [[t5p1f1, t5p1f2], [t5p2f1, t5p2f2], [t5p3f1, t5p3f2], [t5p4f1, t5p4f2]],
            team6: [[t6p1f1, t6p1f2], [t6p2f1, t6p2f2], [t6p3f1, t6p3f2], [t6p4f1, t6p4f2]],
        }

        console.log(newData);

        const eventData = {
            ...event,
            scoreData: newData,
        }

        axios.put('/api/events/' + event._id, eventData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const createTeamSections = () => {
        const teamArr = [1,2,3,4,5,6];
        const playerArr = [1,2,3,4];
        return teamArr.map((teamNum) => {
                let teamScore = Math.max(eval('t' + teamNum + 'p' + 1 + 'f1'), eval('t' + teamNum + 'p' + 1 + 'f2')) + 
                                Math.max(eval('t' + teamNum + 'p' + 2 + 'f1'), eval('t' + teamNum + 'p' + 2 + 'f2')) + 
                                Math.max(eval('t' + teamNum + 'p' + 3 + 'f1'), eval('t' + teamNum + 'p' + 3 + 'f2')) + 
                                Math.max(eval('t' + teamNum + 'p' + 4 + 'f1'), eval('t' + teamNum + 'p' + 4 + 'f2'));
            return (<div className='bowlingTeam' >
                    <h3>{teams[teamNum-1].name}</h3>
                {playerArr.map((player) => {
                    return (
                        <div className='bowlingRow'>
                            <label htmlFor={`t${teamNum}p${player}f1`}>{teams[teamNum-1].members[player-1]}: </label>
                            <input 
                            className='frame1'
                            type='number' 
                            name={`t${teamNum}p${player}f1`} 
                            id={`t${teamNum}p${player}f1`} 
                            value={eval('t' + teamNum + 'p' + player + 'f1')}
                            max={300}
                            min={0}
                            onChange={onChange} />
                            <input 
                            className='frame2'
                            type='number' 
                            name={`t${teamNum}p${player}f2`} 
                            id={`t${teamNum}p${player}f2`} 
                            value={eval('t' + teamNum + 'p' + player + 'f2')}
                            max={300}
                            min={0}
                            onChange={onChange} />
                            {/*<p>max: {Math.max(eval('t' + teamNum + 'p' + player + 'f1'), eval('t' + teamNum + 'p' + player + 'f2'))}</p>*/}
                        </div>
                    )
                })
                   
                }
                <h5>Score: {teamScore}</h5>
            </div>)
        })
    }

    if(!event || teams.length<6){
        return <Spinner />
      }

  return (
    <div>
        <form onSubmit={onSubmit}>
            {createTeamSections()}
            <br></br>
            <button type='submit' className='btn btn-block'>
                Submit 
            </button>
        </form>
    </div>
  )
}

export default BowlingForm