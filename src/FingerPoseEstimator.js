import { Finger, FingerCurl, FingerDirection } from "./FingerDescription";

export default class FingerPoseEstimator {
    constructor(options) {
        this.options = {...{
            // estimación de curl
            HALF_CURL_START_LIMIT: 60.0,
            NO_CURL_START_LIMIT: 130.0,

            // Estimación de dirección
            DISTANCE_VOTE_POWER: 1.1,
            SINGLE_ANGLE_VOTE_POWER: 0.9,
            TOTAL_ANGLE_VOTE_POWER: 1.6
        }, ...options};
    }

    estimate(landmarks) {
        // paso 1: calcular la pendiente
        let slopesXY = [];
        let slopesYZ = [];

        for(let finger of Finger.all) {
            let points = Finger.getPoints(finger);
            let slopeAtXY = [];
            let slopeAtYZ = [];

            for (let point of points) {
                let point1 = landmarks[point[0]];
                let point2 = landmarks[point[1]];

                // Calcular una pendiente
                let slopes = this.getSlopes(point1, point2);
                let slopesXY = slopes[0];
                let slopesYZ = slopes[1];
                slopeAtXY.push(slopesXY);
                slopeAtYZ.push(slopesYZ);
            }
            slopesXY.push(slopeAtXY);
            slopesYZ.push(slopeAtYZ);
        }

        // Paso 2: Calcular orientación
        let fingerCurls = [];
        let FingerDirections = [];

        for (let finger of Finger.all){
            // iniciar las predicciones de los dedos desde la palma, excepto el pulgar
            let pointIndexAt = (finger == Finger.Thum) ? 1 : 0;

            let fingerPointsAt = Finger.getPoints(finger);
            let startPoint = landmarks[fingerPointsAt[pointIndexAt][0]];
            let midPoint = landmarks[fingerPointsAt[pointIndexAt + 1][1]];
            let endPoint = landmarks[fingerPointsAt[3][1]];

            // Revizar si el dedo esta doblado
            let fingerCurled = this.estimateFingerCurl(
                startPoint, midPoint, endPoint, slopesXY[finger].slice(pointIndexAt)
            );

            let fingerPosition = this.calculateFingerDirection(
                startPoint, midPoint, endPoint,
                slopesXY[finger].slice(pointIndexAt)
            );

            fingerCurls[finger] = fingerCurled;
            FingerDirections[finger] = fingerPosition;
        }

        return { curls: fingerCurls, directions: fingerDirections}
    }

    // point1, point2 son matrices de puntos 2d o 3d (xy [z])
    // devuelve un solo escalar (2d) o una matriz de dos pendientes (3d)
    getSlopes(point1, point2) {

        let slopeXY = this.calculateSlope(point1[0], point1[1], point2[0], point2[1]);
        if(point1.length == 2) {
          return slopeXY;
        }
    
        let slopeYZ = this.calculateSlope(point1[1], point1[2], point2[1], point2[2])
        return [slopeXY, slopeYZ];
    }

    angleOrientationAt(angle, weightageAt = 1.0) {

        let isVertical = 0;
        let isDiagonal = 0;
        let isHorizontal = 0;
    
        if(angle >= 75.0 && angle <= 105.0) {
          isVertical = 1 * weightageAt;
        }
        else if(angle >= 25.0 && angle <= 155.0) {
          isDiagonal = 1 * weightageAt;
        }
        else {
          isHorizontal = 1 * weightageAt;
        }
    
        return [isVertical, isDiagonal, isHorizontal];
    }

    estimateFingerCurl(startPoint, midPoint, endPoint) {

        let start_mid_x_dist = startPoint[0] - midPoint[0];
        let start_end_x_dist = startPoint[0] - endPoint[0];
        let mid_end_x_dist = midPoint[0] - endPoint[0];
        
        let start_mid_y_dist = startPoint[1] - midPoint[1];
        let start_end_y_dist = startPoint[1] - endPoint[1];
        let mid_end_y_dist = midPoint[1] - endPoint[1];
      
        let start_mid_z_dist = startPoint[2] - midPoint[2];
        let start_end_z_dist = startPoint[2] - endPoint[2];
        let mid_end_z_dist = midPoint[2] - endPoint[2];
        
        let start_mid_dist = Math.sqrt(
          start_mid_x_dist * start_mid_x_dist +
          start_mid_y_dist * start_mid_y_dist +
          start_mid_z_dist * start_mid_z_dist
        );
        let start_end_dist = Math.sqrt(
          start_end_x_dist * start_end_x_dist +
          start_end_y_dist * start_end_y_dist +
          start_end_z_dist * start_end_z_dist
        );
        let mid_end_dist = Math.sqrt(
          mid_end_x_dist * mid_end_x_dist +
          mid_end_y_dist * mid_end_y_dist +
          mid_end_z_dist * mid_end_z_dist
        );

        let cos_in = (
            mid_end_dist * mid_end_dist +
            start_mid_dist * start_mid_dist -
            start_end_dist *start_end_dist
        ) / (2 * mid_end_dist * start_mid_dist);
      
        if(cos_in > 1.0) {
            cos_in = 1.0;
        }
        else if(cos_in < -1.0) {
            cos_in = -1.0;
        }
      
        let angleOfCurve = Math.acos(cos_in);
        angleOfCurve = (57.2958 * angleOfCurve) % 180;
      
        let fingerCurl;
        if(angleOfCurve > this.options.NO_CURL_START_LIMIT) {
            fingerCurl = FingerCurl.NoCurl;
        }
        else if(angleOfCurve > this.options.HALF_CURL_START_LIMIT) {
            fingerCurl = FingerCurl.HalfCurl;
        }
        else {
            fingerCurl = FingerCurl.FullCurl;
        }
      
        return fingerCurl;
    }
        
    estimateHorizontalDirection(start_end_x_dist, start_mid_x_dist, mid_end_x_dist, max_dist_x) {

        let estimatedDirection;
        if(max_dist_x == Math.abs(start_end_x_dist)) {
            if(start_end_x_dist > 0) {
                estimatedDirection = FingerDirection.HorizontalLeft;
            } else {
                estimatedDirection = FingerDirection.HorizontalRight;
            }
        }
        else if(max_dist_x == Math.abs(start_mid_x_dist)) {
            if(start_mid_x_dist > 0) {
                estimatedDirection = FingerDirection.HorizontalLeft;
            } else {
                estimatedDirection = FingerDirection.HorizontalRight;
            }
        }
        else {
            if(mid_end_x_dist > 0) {
                estimatedDirection = FingerDirection.HorizontalLeft;
            } else {
                estimatedDirection = FingerDirection.HorizontalRight;
            }
        }
        
        return estimatedDirection;
    }

    estimateVerticalDirection(start_end_y_dist, start_mid_y_dist, mid_end_y_dist, max_dist_y) {

        let estimatedDirection;
        if(max_dist_y == Math.abs(start_end_y_dist)) {
            if(start_end_y_dist < 0) {
                estimatedDirection = FingerDirection.VerticalDown;
            } else {
                estimatedDirection = FingerDirection.VerticalUp;
            }
        }
        else if(max_dist_y == Math.abs(start_mid_y_dist)) {
            if(start_mid_y_dist < 0) {
                estimatedDirection = FingerDirection.VerticalDown;
            } else {
                estimatedDirection = FingerDirection.VerticalUp;
            }
        }
        else {
            if(mid_end_y_dist < 0) {
                estimatedDirection = FingerDirection.VerticalDown;
            } else {
                estimatedDirection = FingerDirection.VerticalUp;
            }
        }
    
        return estimatedDirection;
    }

    estimateDiagonalDirection(
        start_end_y_dist, start_mid_y_dist, mid_end_y_dist, max_dist_y,
        start_end_x_dist, start_mid_x_dist, mid_end_x_dist, max_dist_x
      ) {
    
        let estimatedDirection;
        let reqd_vertical_direction = this.estimateVerticalDirection(
          start_end_y_dist, start_mid_y_dist, mid_end_y_dist, max_dist_y
        );
        let reqd_horizontal_direction = this.estimateHorizontalDirection(
          start_end_x_dist, start_mid_x_dist, mid_end_x_dist, max_dist_x
        );
        
        if(reqd_vertical_direction == FingerDirection.VerticalUp) {
            if(reqd_horizontal_direction == FingerDirection.HorizontalLeft) {
                estimatedDirection = FingerDirection.DiagonalUpLeft;
            } else {
                estimatedDirection = FingerDirection.DiagonalUpRight;
            }
        }
        else {
            if(reqd_horizontal_direction == FingerDirection.HorizontalLeft) {
                estimatedDirection = FingerDirection.DiagonalDownLeft;
            } else {
                estimatedDirection = FingerDirection.DiagonalDownRight;
            }
        }
    
        return estimatedDirection;
    }

    calculateFingerDirection(startPoint, midPoint, endPoint, fingerSlopes) {

        let start_mid_x_dist = startPoint[0] - midPoint[0];
        let start_end_x_dist = startPoint[0] - endPoint[0];
        let mid_end_x_dist = midPoint[0] - endPoint[0];
        
        let start_mid_y_dist = startPoint[1] - midPoint[1];
        let start_end_y_dist = startPoint[1] - endPoint[1];
        let mid_end_y_dist = midPoint[1] - endPoint[1];
    
        let max_dist_x = Math.max(
            Math.abs(start_mid_x_dist),
            Math.abs(start_end_x_dist),
            Math.abs(mid_end_x_dist)
        );
        let max_dist_y = Math.max(
            Math.abs(start_mid_y_dist),
            Math.abs(start_end_y_dist),
            Math.abs(mid_end_y_dist)
        );
    
        let voteVertical = 0.0;
        let voteDiagonal = 0.0;
        let voteHorizontal = 0.0;
    
        let start_end_x_y_dist_ratio = max_dist_y / (max_dist_x + 0.00001);
        if(start_end_x_y_dist_ratio > 1.5) {
            voteVertical += this.options.DISTANCE_VOTE_POWER;
        }
        else if(start_end_x_y_dist_ratio > 0.66) {
            voteDiagonal += this.options.DISTANCE_VOTE_POWER;
        }
        else {
            voteHorizontal += this.options.DISTANCE_VOTE_POWER;
        }
    
        let start_mid_dist = Math.sqrt(
            start_mid_x_dist * start_mid_x_dist + start_mid_y_dist *start_mid_y_dist
        );
        let start_end_dist = Math.sqrt(
            start_end_x_dist * start_end_x_dist + start_end_y_dist * start_end_y_dist
        );
        let mid_end_dist = Math.sqrt(
            mid_end_x_dist * mid_end_x_dist + mid_end_y_dist * mid_end_y_dist
        );
    
        let max_dist = Math.max(start_mid_dist, start_end_dist, mid_end_dist);
        let calc_start_point_x = startPoint[0],
            calc_start_point_y = startPoint[1];
        let calc_end_point_x = endPoint[0],
            calc_end_point_y = endPoint[1];
    
        if(max_dist == start_mid_dist) {
            calc_end_point_x = endPoint[0],
            calc_end_point_y = endPoint[1];
        }
        else if(max_dist == mid_end_dist) {
            calc_start_point_x = midPoint[0],
            calc_start_point_y = midPoint[1];
        }
    
        let calcStartPoint = [calc_start_point_x, calc_start_point_y];
        let calcEndPoint = [calc_end_point_x, calc_end_point_y];
    
        let totalAngle = this.getSlopes(calcStartPoint, calcEndPoint);
        let votes = this.angleOrientationAt(totalAngle, this.options.TOTAL_ANGLE_VOTE_POWER);
        voteVertical += votes[0];
        voteDiagonal += votes[1];
        voteHorizontal += votes[2];
    
        for(let fingerSlope of fingerSlopes) {
            let votes = this.angleOrientationAt(fingerSlope, this.options.SINGLE_ANGLE_VOTE_POWER);
            voteVertical += votes[0];
            voteDiagonal += votes[1];
            voteHorizontal += votes[2];
        }
    
        // in case of tie, highest preference goes to Vertical,
        // followed by horizontal and then diagonal
        let estimatedDirection;
        if(voteVertical == Math.max(voteVertical, voteDiagonal, voteHorizontal)) {
            estimatedDirection = this.estimateVerticalDirection(
                start_end_y_dist,
                start_mid_y_dist, 
                mid_end_y_dist, max_dist_y
            );
        }
        else if(voteHorizontal == Math.max(voteDiagonal, voteHorizontal)) {
            estimatedDirection = this.estimateHorizontalDirection(
                start_end_x_dist,
                start_mid_x_dist,
                mid_end_x_dist, max_dist_x
            );
        }
        else {
            estimatedDirection = this.estimateDiagonalDirection(
                start_end_y_dist, start_mid_y_dist,
                mid_end_y_dist, max_dist_y,
                start_end_x_dist, start_mid_x_dist,
                mid_end_x_dist, max_dist_x
            );
        }
    
        return estimatedDirection;
    }
    
    calculateSlope(point1x, point1y, point2x, point2y) {
    
        let value = (point1y - point2y) / (point1x - point2x);
        let slope = Math.atan(value) * 180 / Math.PI;
    
        if(slope <= 0) {
            slope = -slope;
        }
        else if(slope > 0) {
            slope = 180 - slope;
        }
    
        return slope;
      }
}