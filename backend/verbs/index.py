'''
Business: API для работы с неправильными глаголами и прогрессом обучения
Args: event - dict с httpMethod, body, queryStringParameters
      context - object с request_id, function_name
Returns: HTTP response dict
'''

import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cursor = conn.cursor()
    
    try:
        if method == 'GET':
            cursor.execute('''
                SELECT 
                    v.id, v.infinitive, v.past_simple, v.past_participle, 
                    v.translation, v.image_url,
                    COALESCE(p.studied_count, 0) as studied_count,
                    COALESCE(p.is_mastered, false) as is_mastered
                FROM irregular_verbs v
                LEFT JOIN user_progress p ON v.id = p.verb_id
                ORDER BY v.id
            ''')
            
            verbs = []
            for row in cursor.fetchall():
                verbs.append({
                    'id': row[0],
                    'infinitive': row[1],
                    'pastSimple': row[2],
                    'pastParticiple': row[3],
                    'translation': row[4],
                    'imageUrl': row[5],
                    'studiedCount': row[6],
                    'isMastered': row[7]
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'verbs': verbs})
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            verb_id = body.get('verbId')
            
            if action == 'study':
                cursor.execute('''
                    SELECT id FROM user_progress WHERE verb_id = %s
                ''', (verb_id,))
                
                existing = cursor.fetchone()
                
                if existing:
                    cursor.execute('''
                        UPDATE user_progress 
                        SET studied_count = studied_count + 1, last_studied = NOW()
                        WHERE verb_id = %s
                    ''', (verb_id,))
                else:
                    cursor.execute('''
                        INSERT INTO user_progress (verb_id, studied_count, last_studied)
                        VALUES (%s, 1, NOW())
                    ''', (verb_id,))
                
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True})
                }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            verb_id = body.get('verbId')
            image_url = body.get('imageUrl')
            
            cursor.execute(
                'UPDATE irregular_verbs SET image_url = %s WHERE id = %s',
                (image_url, verb_id)
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True})
            }
        
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        cursor.close()
        conn.close()